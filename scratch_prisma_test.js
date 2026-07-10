const { PrismaClient } = require('./src/generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max: 3,
    });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        console.log("--- TEST 1: Sequential Counts ---");
        const startSeq = Date.now();
        const eventCount = await prisma.event.count();
        const memberCount = await prisma.member.count();
        const achievementCount = await prisma.achievement.count();
        const pressReleaseCount = await prisma.pressRelease.count();
        const partnerCount = await prisma.partner.count();
        const noticeBoardCount = await prisma.noticeBoard.count();
        console.log("Sequential Counts Result:", { eventCount, memberCount, achievementCount, pressReleaseCount, partnerCount, noticeBoardCount });
        console.log("Sequential Time:", Date.now() - startSeq, "ms");

        console.log("\n--- TEST 2: Single Raw Query ---");
        const startRaw = Date.now();
        const rawResult = await prisma.$queryRawUnsafe(`
            SELECT 
                (SELECT COUNT(*)::int FROM "Event") as event_count,
                (SELECT COUNT(*)::int FROM "Member") as member_count,
                (SELECT COUNT(*)::int FROM "Achievement") as achievement_count,
                (SELECT COUNT(*)::int FROM "PressRelease") as press_release_count,
                (SELECT COUNT(*)::int FROM "Partner") as partner_count,
                (SELECT COUNT(*)::int FROM "NoticeBoard") as notice_board_count
        `);
        console.log("Raw Query Result:", rawResult);
        console.log("Raw Query Time:", Date.now() - startRaw, "ms");

    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
