import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis;

function createPrismaClient() {
    const isDev = process.env.NODE_ENV !== "production";
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max: isDev ? 2 : 10,            // Limit connections in dev to prevent Neon exhaustion
        idleTimeoutMillis: 10000,       // Close idle connections after 10s
        connectionTimeoutMillis: 5000,  // Throw timeout error after 5s instead of hanging
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
