import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User, insertUserSchema, RegisterData } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

declare global {
  namespace Express {
    interface User extends User {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

// Для отладки
export async function generateHashForPassword(password: string) {
  return hashPassword(password);
}

async function comparePasswords(supplied: string, stored: string) {
  if (!stored || !stored.includes('.')) {
    console.error("Ошибка в формате хеша пароля, отсутствует разделитель");
    return false;
  }
  
  const [hashed, salt] = stored.split(".");
  if (!salt) {
    console.error("Соль не найдена в хеше пароля");
    return false;
  }
  
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function generateRefCode() {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "investpro-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Неверное имя пользователя или пароль" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Register endpoint
  app.post("/api/register", async (req, res, next) => {
    try {
      const userData: RegisterData = req.body;
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }
      
      // Hash the password
      const hashedPassword = await hashPassword(userData.password);
      
      // Create user
      const insertData = insertUserSchema.parse({
        username: userData.username,
        password: hashedPassword,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        email: userData.email || null,
        phone: userData.phone || null,
      });
      
      const user = await storage.createUser(insertData, userData.refCode);
      
      // Log user in
      req.login(user, (err) => {
        if (err) return next(err);
        // Remove password before sending back
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      next(error);
    }
  });

  // Login endpoint
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Неверное имя пользователя или пароль" });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        // Remove password before sending back
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  // Get current user
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    // Remove password before sending back
    const { password, ...userWithoutPassword } = req.user as User;
    res.json(userWithoutPassword);
  });
}
