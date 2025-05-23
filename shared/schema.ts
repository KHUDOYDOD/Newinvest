import { pgTable, text, serial, timestamp, numeric, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  balance: numeric("balance", { precision: 10, scale: 2 }).default("0").notNull(),
  refCode: text("ref_code"),
  referrerId: integer("referrer_id").references(() => users.id),
  role: text("role").default("user").notNull(), // user, admin, support
  isActive: boolean("is_active").default(true).notNull(),
  avatarUrl: text("avatar_url"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const deposits = pgTable("deposits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  rate: numeric("rate", { precision: 5, scale: 2 }).notNull(),
  status: text("status").notNull(), // active, completed, canceled
  createdAt: timestamp("created_at").defaultNow(),
  endsAt: timestamp("ends_at"),
  isPaid: boolean("is_paid").default(false),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // deposit, withdraw, profit, referral
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
  description: text("description"),
});

export const depositRequests = pgTable("deposit_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  adminComment: text("admin_comment"),
  approvedBy: integer("approved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

export const withdrawRequests = pgTable("withdraw_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  walletAddress: text("wallet_address").notNull(),
  paymentMethod: text("payment_method").notNull(),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  adminComment: text("admin_comment"),
  approvedBy: integer("approved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  role: true,
});

export const insertDepositSchema = createInsertSchema(deposits).pick({
  userId: true,
  amount: true,
  rate: true,
  status: true,
  endsAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  type: true,
  amount: true,
  status: true,
  description: true,
});

export const loginSchema = z.object({
  username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: z.string(),
  refCode: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const depositSchema = z.object({
  amount: z.number().min(100, "Минимальная сумма инвестиции $100"),
  plan: z.enum(["5", "10", "15"]),
});

export const withdrawSchema = z.object({
  amount: z.number().min(10, "Минимальная сумма вывода $10"),
  wallet: z.string().min(10, "Введите корректный адрес кошелька"),
});

export const depositRequestSchema = z.object({
  amount: z.number().min(10, "Минимальная сумма пополнения $10"),
  paymentMethod: z.string().min(1, "Выберите способ оплаты"),
});

export const withdrawRequestSchema = z.object({
  amount: z.number().min(10, "Минимальная сумма вывода $10"),
  walletAddress: z.string().min(10, "Введите корректный адрес кошелька"),
  paymentMethod: z.string().min(1, "Выберите способ вывода"),
});

export const adminActionSchema = z.object({
  requestId: z.number(),
  action: z.enum(["approve", "reject"]),
  comment: z.string().optional(),
});

// Type Exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Deposit = typeof deposits.$inferSelect;
export type InsertDeposit = z.infer<typeof insertDepositSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type DepositRequest = typeof depositRequests.$inferSelect;
export type WithdrawRequest = typeof withdrawRequests.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type DepositData = z.infer<typeof depositSchema>;
export type WithdrawData = z.infer<typeof withdrawSchema>;
export type DepositRequestData = z.infer<typeof depositRequestSchema>;
export type WithdrawRequestData = z.infer<typeof withdrawRequestSchema>;
export type AdminActionData = z.infer<typeof adminActionSchema>;
