import { users, deposits, transactions, depositRequests, withdrawRequests, type User, type InsertUser, type Deposit, type InsertDeposit, type Transaction, type InsertTransaction, type DepositRequest, type WithdrawRequest } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";
import { nanoid } from "nanoid";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser, refCode?: string): Promise<User>;
  updateUserBalance(userId: number, amount: number): Promise<User | undefined>;
  updateUserStatus(userId: number, isActive: boolean): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Deposits
  createDeposit(deposit: InsertDeposit): Promise<Deposit>;
  getDeposit(id: number): Promise<Deposit | undefined>;
  getDepositsByUserId(userId: number): Promise<Deposit[]>;
  updateDepositStatus(id: number, status: string): Promise<void>;
  getAllDeposits(): Promise<Deposit[]>;
  
  // Transactions
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  getAllTransactions(): Promise<Transaction[]>;

  // Referrals
  getUserByRefCode(refCode: string): Promise<User | undefined>;
  createReferralTransaction(referrerId: number, amount: number, description: string): Promise<Transaction>;
  getReferrals(userId: number): Promise<User[]>;
  
  // Deposit Requests
  createDepositRequest(request: any): Promise<DepositRequest>;
  getDepositRequest(id: number): Promise<DepositRequest | undefined>;
  getDepositRequestsByUserId(userId: number): Promise<DepositRequest[]>;
  getAllDepositRequests(): Promise<DepositRequest[]>;
  updateDepositRequestStatus(id: number, status: string, comment?: string, adminId?: number): Promise<void>;
  
  // Withdraw Requests
  createWithdrawRequest(request: any): Promise<WithdrawRequest>;
  getWithdrawRequest(id: number): Promise<WithdrawRequest | undefined>;
  getWithdrawRequestsByUserId(userId: number): Promise<WithdrawRequest[]>;
  getAllWithdrawRequests(): Promise<WithdrawRequest[]>;
  updateWithdrawRequestStatus(id: number, status: string, comment?: string, adminId?: number): Promise<void>;
  
  // Session Store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private deposits: Map<number, Deposit>;
  private transactions: Map<number, Transaction>;
  private depositRequests: Map<number, DepositRequest>;
  private withdrawRequests: Map<number, WithdrawRequest>;
  private userIdCounter: number;
  private depositIdCounter: number;
  private transactionIdCounter: number;
  private depositRequestIdCounter: number;
  private withdrawRequestIdCounter: number;
  sessionStore: any;
  
  constructor() {
    this.users = new Map();
    this.deposits = new Map();
    this.transactions = new Map();
    this.depositRequests = new Map();
    this.withdrawRequests = new Map();
    this.userIdCounter = 1;
    this.depositIdCounter = 1;
    this.transactionIdCounter = 1;
    this.depositRequestIdCounter = 1;
    this.withdrawRequestIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Создаем администратора с предварительно захешированным паролем
    // X12345x захешированный пароль
    const adminPassword = "8f1846fab37a8c564bc256a4a095d81a7c202dc808dff7e2cf7a4eb4f6854707c0edb0db5ca13c87de38dd15b69f4d4b613df29493fbe063aed04b7d9dd73313.80e1538fab4d31f1d3deb46c882a8777";
    this.createUser({
      username: "Admin",
      password: adminPassword,
      firstName: "Администратор",
      lastName: "Системы",
      email: "admin@investpro.ru",
      phone: "",
      role: "admin"
    }).catch(err => console.error("Ошибка при создании администратора:", err));
  }
  
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async createUser(userData: InsertUser, refCode?: string): Promise<User> {
    const id = this.userIdCounter++;
    let referrerId = null;
    
    if (refCode) {
      const referrer = await this.getUserByRefCode(refCode);
      if (referrer) {
        referrerId = referrer.id;
      }
    }
    
    // Устанавливаем значения по умолчанию, если они не были предоставлены
    const role = userData.role || "user";
    
    const user: User = {
      id,
      ...userData,
      role,
      balance: "0",
      refCode: nanoid(8),
      referrerId: referrerId || null,
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
    };
    
    this.users.set(id, user);
    return user;
  }
  
  async updateUserBalance(userId: number, amount: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const newBalance = parseFloat(user.balance.toString()) + amount;
    const updatedUser = { ...user, balance: newBalance.toString() };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Deposit Methods
  async createDeposit(depositData: InsertDeposit): Promise<Deposit> {
    const id = this.depositIdCounter++;
    const deposit: Deposit = {
      id,
      ...depositData,
      createdAt: new Date(),
      isPaid: false,
    };
    
    this.deposits.set(id, deposit);
    return deposit;
  }
  
  async getDeposit(id: number): Promise<Deposit | undefined> {
    return this.deposits.get(id);
  }
  
  async getDepositsByUserId(userId: number): Promise<Deposit[]> {
    return Array.from(this.deposits.values()).filter(
      (deposit) => deposit.userId === userId
    );
  }
  
  async updateDepositStatus(id: number, status: string): Promise<void> {
    const deposit = await this.getDeposit(id);
    if (deposit) {
      this.deposits.set(id, { ...deposit, status });
    }
  }
  
  // Transaction Methods
  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const transaction: Transaction = {
      id,
      ...transactionData,
      createdAt: new Date(),
    };
    
    this.transactions.set(id, transaction);
    return transaction;
  }
  
  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  // Referral Methods
  async getUserByRefCode(refCode: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.refCode === refCode
    );
  }
  
  async createReferralTransaction(referrerId: number, amount: number, description: string): Promise<Transaction> {
    return this.createTransaction({
      userId: referrerId,
      type: "referral",
      amount: amount.toString(),
      status: "completed",
      description,
    });
  }
  
  async getReferrals(userId: number): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.referrerId === userId
    );
  }
  
  // Методы для административной панели
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async getAllDeposits(): Promise<Deposit[]> {
    return Array.from(this.deposits.values());
  }
  
  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }
  
  async updateUserStatus(userId: number, isActive: boolean): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { ...user, isActive };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Deposit Requests methods
  async createDepositRequest(request: any): Promise<DepositRequest> {
    const id = this.depositRequestIdCounter++;
    const depositRequest: DepositRequest = {
      id,
      userId: request.userId,
      amount: request.amount,
      paymentMethod: request.paymentMethod,
      status: request.status || "pending",
      adminComment: null,
      approvedBy: null,
      createdAt: new Date(),
      processedAt: null,
    };
    
    this.depositRequests.set(id, depositRequest);
    return depositRequest;
  }

  async getDepositRequest(id: number): Promise<DepositRequest | undefined> {
    return this.depositRequests.get(id);
  }

  async getDepositRequestsByUserId(userId: number): Promise<DepositRequest[]> {
    return Array.from(this.depositRequests.values())
      .filter(request => request.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getAllDepositRequests(): Promise<DepositRequest[]> {
    return Array.from(this.depositRequests.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async updateDepositRequestStatus(id: number, status: string, comment?: string, adminId?: number): Promise<void> {
    const request = this.depositRequests.get(id);
    if (!request) return;
    
    const updatedRequest = {
      ...request,
      status,
      adminComment: comment || null,
      approvedBy: adminId || null,
      processedAt: new Date(),
    };
    
    this.depositRequests.set(id, updatedRequest);
  }

  // Withdraw Requests methods
  async createWithdrawRequest(request: any): Promise<WithdrawRequest> {
    const id = this.withdrawRequestIdCounter++;
    const withdrawRequest: WithdrawRequest = {
      id,
      userId: request.userId,
      amount: request.amount,
      walletAddress: request.walletAddress,
      paymentMethod: request.paymentMethod,
      status: request.status || "pending",
      adminComment: null,
      approvedBy: null,
      createdAt: new Date(),
      processedAt: null,
    };
    
    this.withdrawRequests.set(id, withdrawRequest);
    return withdrawRequest;
  }

  async getWithdrawRequest(id: number): Promise<WithdrawRequest | undefined> {
    return this.withdrawRequests.get(id);
  }

  async getWithdrawRequestsByUserId(userId: number): Promise<WithdrawRequest[]> {
    return Array.from(this.withdrawRequests.values())
      .filter(request => request.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getAllWithdrawRequests(): Promise<WithdrawRequest[]> {
    return Array.from(this.withdrawRequests.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async updateWithdrawRequestStatus(id: number, status: string, comment?: string, adminId?: number): Promise<void> {
    const request = this.withdrawRequests.get(id);
    if (!request) return;
    
    const updatedRequest = {
      ...request,
      status,
      adminComment: comment || null,
      approvedBy: adminId || null,
      processedAt: new Date(),
    };
    
    this.withdrawRequests.set(id, updatedRequest);
  }
}

export const storage = new MemStorage();
