import React from "react";
import prisma from "@/lib/prisma";
import PartnersClient from "./PartnersClient";

export default async function Partners() {
    const partners = await prisma.partner.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
    });

    if (partners.length === 0) return null;

    return <PartnersClient partners={partners} />;
}