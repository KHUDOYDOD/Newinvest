import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertDepositSchema, insertTransactionSchema, depositSchema, withdrawSchema, depositRequestSchema, withdrawRequestSchema, adminActionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Helper function to check authentication
function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Не авторизован" });
}

// Middleware для проверки прав администратора
function isAdmin(req: Request, res: Response, next: Function) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Не авторизован" });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Доступ запрещен. Требуются права администратора." });
  }
  return next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  setupAuth(app);
  
  // Админ-маршруты
  
  // Получение списка всех пользователей
  app.get("/api/admin/users", isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Удаляем пароли из ответа
      const sanitizedUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(sanitizedUsers);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении списка пользователей" });
    }
  });
  
  // Изменение баланса пользователя
  app.post("/api/admin/users/:id/balance", isAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { amount, type, description } = req.body;
      
      const amountValue = parseFloat(amount);
      if (isNaN(amountValue)) {
        return res.status(400).json({ message: "Некорректная сумма" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      
      const finalAmount = type === "add" ? amountValue : -amountValue;
      
      // Обновляем баланс
      await storage.updateUserBalance(userId, finalAmount);
      
      // Создаем транзакцию
      await storage.createTransaction({
        userId,
        type: type === "add" ? "admin_deposit" : "admin_withdraw",
        amount: finalAmount.toString(),
        status: "completed",
        description: description || `Изменение баланса администратором (${req.user.username})`,
      });
      
      const updatedUser = await storage.getUser(userId);
      const { password, ...userWithoutPassword } = updatedUser!;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при изменении баланса" });
    }
  });
  
  // Изменение статуса пользователя (блокировка/разблокировка)
  app.patch("/api/admin/users/:id/status", isAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { isActive } = req.body;
      
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: "Некорректный статус" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      
      // Обновляем статус
      await storage.updateUserStatus(userId, isActive);
      
      const updatedUser = await storage.getUser(userId);
      const { password, ...userWithoutPassword } = updatedUser!;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при изменении статуса пользователя" });
    }
  });
  
  // Получение настроек системы
  app.get("/api/admin/settings", isAdmin, async (req, res) => {
    try {
      // Здесь в реальной системе мы бы получали настройки из базы данных
      // Для демонстрации возвращаем фиктивные данные
      res.json({
        siteTitle: "ИнвестПро - Инвестиционная платформа",
        siteDescription: "Инвестиционная платформа с высокими процентами доходности",
        contactEmail: "admin@investpro.ru",
        maintenanceMode: false,
        referralPercent: "5",
        cryptoEnabled: true,
        cardEnabled: true,
        depositMinAmount: "100",
        withdrawMinAmount: "10",
        plan1Rate: "5",
        plan2Rate: "10",
        plan3Rate: "15",
      });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении настроек" });
    }
  });
  
  // Сохранение настроек системы
  app.post("/api/admin/settings", isAdmin, async (req, res) => {
    try {
      // Здесь в реальной системе мы бы сохраняли настройки в базу данных
      res.json({ message: "Настройки успешно сохранены", ...req.body });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при сохранении настроек" });
    }
  });
  
  // Создание резервной копии
  app.post("/api/admin/backup", isAdmin, async (req, res) => {
    try {
      // Имитация создания резервной копии
      setTimeout(() => {}, 1000);
      res.json({ message: "Резервная копия создана успешно", timestamp: new Date().toISOString() });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при создании резервной копии" });
    }
  });

  // API routes
  // Get user's deposits
  app.get("/api/deposits", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const deposits = await storage.getDepositsByUserId(userId);
      res.json(deposits);
    } catch (error) {
      res.status(500).json({ message: "Произошла ошибка при получении депозитов" });
    }
  });

  // Create a new deposit
  app.post("/api/deposits", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const validatedData = depositSchema.parse(req.body);
      
      const amount = parseFloat(validatedData.amount.toString());
      const rate = parseFloat(validatedData.plan);
      
      // Validate minimum amounts based on rate
      let minAmount = 100;
      if (rate === 10) minAmount = 500;
      if (rate === 15) minAmount = 1000;
      
      if (amount < minAmount) {
        return res.status(400).json({ 
          message: `Минимальная сумма для этого тарифа: $${minAmount}` 
        });
      }
      
      // Calculate end time (24 hours from now)
      const endsAt = new Date();
      endsAt.setHours(endsAt.getHours() + 24);
      
      // Create deposit
      const depositData = insertDepositSchema.parse({
        userId,
        amount: amount.toString(),
        rate: rate.toString(),
        status: "active",
        endsAt,
      });
      
      const deposit = await storage.createDeposit(depositData);
      
      // Create transaction record
      await storage.createTransaction({
        userId,
        type: "deposit",
        amount: amount.toString(),
        status: "completed",
        description: `Инвестиция по тарифу ${rate}%`,
      });
      
      // Update user balance
      await storage.updateUserBalance(userId, amount);
      
      // Process referral bonus if applicable
      const user = await storage.getUser(userId);
      if (user?.referrerId) {
        const referralRate = rate === 5 ? 0.001 : rate === 10 ? 0.0015 : 0.002;
        const referralBonus = amount * referralRate;
        
        // Update referrer's balance
        await storage.updateUserBalance(user.referrerId, referralBonus);
        
        // Create referral transaction
        await storage.createReferralTransaction(
          user.referrerId,
          referralBonus,
          `Реферальный бонус от ${user.username}`
        );
      }
      
      res.status(201).json(deposit);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Произошла ошибка при создании депозита" });
    }
  });

  // Get user's transactions
  app.get("/api/transactions", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const transactions = await storage.getTransactionsByUserId(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Произошла ошибка при получении транзакций" });
    }
  });

  // Withdraw funds
  app.post("/api/withdraw", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const validatedData = withdrawSchema.parse(req.body);
      
      const amount = parseFloat(validatedData.amount.toString());
      const wallet = validatedData.wallet;
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      
      const currentBalance = parseFloat(user.balance.toString());
      
      if (amount > currentBalance) {
        return res.status(400).json({ message: "Недостаточно средств на балансе" });
      }
      
      // Create withdrawal transaction
      const transaction = await storage.createTransaction({
        userId,
        type: "withdraw",
        amount: (-amount).toString(),
        status: "completed",
        description: `Вывод средств на кошелек ${wallet}`,
      });
      
      // Update user balance
      await storage.updateUserBalance(userId, -amount);
      
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Произошла ошибка при выводе средств" });
    }
  });

  // Get referrals
  app.get("/api/referrals", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const referrals = await storage.getReferrals(userId);
      
      // Remove sensitive information
      const sanitizedReferrals = referrals.map(referral => {
        const { password, ...referralWithoutPassword } = referral;
        return referralWithoutPassword;
      });
      
      res.json(sanitizedReferrals);
    } catch (error) {
      res.status(500).json({ message: "Произошла ошибка при получении рефералов" });
    }
  });

  // Process deposit profits (this would normally be done by a cron job)
  app.post("/api/process-profits", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const deposits = await storage.getDepositsByUserId(userId);
      
      const now = new Date();
      let profitsAdded = false;
      
      for (const deposit of deposits) {
        // Check if deposit is active and 24 hours have passed
        if (deposit.status === "active" && 
            deposit.endsAt && new Date(deposit.endsAt) <= now && 
            !deposit.isPaid) {
          
          const amount = parseFloat(deposit.amount.toString());
          const rate = parseFloat(deposit.rate.toString());
          const profit = amount * (rate / 100);
          
          // Add profit to user balance
          await storage.updateUserBalance(userId, profit);
          
          // Create profit transaction
          await storage.createTransaction({
            userId,
            type: "profit",
            amount: profit.toString(),
            status: "completed",
            description: `Прибыль по депозиту #${deposit.id} (${rate}%)`,
          });
          
          // Update deposit as paid
          const updatedDeposit = { ...deposit, isPaid: true };
          await storage.updateDepositStatus(deposit.id, "completed");
          
          profitsAdded = true;
        }
      }
      
      if (profitsAdded) {
        res.json({ message: "Прибыль успешно начислена" });
      } else {
        res.json({ message: "Нет депозитов для начисления прибыли" });
      }
    } catch (error) {
      res.status(500).json({ message: "Произошла ошибка при обработке прибыли" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
