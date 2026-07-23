"use server";

import fs from "fs";
import path from "path";

/**
 * Returns a list of years for which a corresponding year file exists in `src/app/prevEvent/yearWise/`.
 * Example: `year2024.js` -> 2024
 */
export async function getAvailableYearFiles() {
    try {
        const yearWiseDir = path.join(process.cwd(), "src", "app", "prevEvent", "yearWise");
        if (!fs.existsSync(yearWiseDir)) {
            return [];
        }

        const files = fs.readdirSync(yearWiseDir);
        const availableYears = [];

        for (const file of files) {
            // Match files starting with 'year' followed by digits and valid extension (.js, .jsx, .ts, .tsx)
            const match = file.match(/^year(\d+)\.(js|jsx|ts|tsx)$/i);
            if (match) {
                const yearNum = parseInt(match[1], 10);
                if (!isNaN(yearNum)) {
                    availableYears.push(yearNum);
                }
            }
        }

        return availableYears;
    } catch (error) {
        console.error("Error reading yearWise directory:", error);
        return [];
    }
}
