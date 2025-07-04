import crypto from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function main() {
  const adminPassword = "X12345x";
  const hashedPassword = await hashPassword(adminPassword);
  console.log("Хешированный пароль для администратора:", hashedPassword);
}

main().catch(console.error);