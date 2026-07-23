import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis;

function createPrismaClient() {
    const isDev = process.env.NODE_ENV !== "production";
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max: isDev ? 2 : 10,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 5000,
        ssl: true, // Neon requires SSL
    });

    if (isDev) {
        pool.on("error", (err) => {
            console.error("Unexpected database pool error:", err);
        });
    }

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
