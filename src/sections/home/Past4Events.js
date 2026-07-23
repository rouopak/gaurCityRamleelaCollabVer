import React from 'react';
import prisma from "@/lib/prisma";
import { getAvailableYearFiles } from "@/app/actions/yearFiles";
import Past4EventsClient from "./Past4EventsClient";

const Past4Events = async () => {
    let events = [];
    let availableYears = [];
    try {
        events = await prisma.event.findMany({
            where: { published: true },
            orderBy: { year: "desc" },
            take: 4,
        });
        availableYears = await getAvailableYearFiles();
    } catch (error) {
        console.error("Failed to fetch past events:", error);
    }

    return <Past4EventsClient initialEvents={events} availableYears={availableYears} />;
};

export default Past4Events;