import React from "react";
import prisma from "@/lib/prisma";
import PartnersClient from "./PartnersClient";
import { partners as staticPartners } from "@/constants";

export default async function Partners() {
    let dbPartners = [];
    
    try {
        dbPartners = await prisma.partner.findMany({
            where: { published: true },
            orderBy: { order: "asc" },
        });
    } catch (error) {
        console.error("Failed to fetch partners from database:", error);
    }

    // Combine static partners and DB partners
    const combinedPartners = [...staticPartners, ...dbPartners];

    if (combinedPartners.length === 0) return null;

    return <PartnersClient partners={combinedPartners} />;
}