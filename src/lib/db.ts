import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

const pool = globalThis.pgPool || new Pool({ 
  connectionString,
  max: 20, // Increased for concurrent Cloud Run requests
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  allowExitOnIdle: true,
});
if (process.env.NODE_ENV !== "production") globalThis.pgPool = pool;

const adapter = new PrismaPg(pool as any);

export const db = globalThis.prisma || new PrismaClient({ 
  adapter,
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
