import React from 'react';
import prisma from "@/lib/prisma";
import Past4EventsClient from "./Past4EventsClient";

const Past4Events = async () => {
    let events = [];
    try {
        events = await prisma.event.findMany({
            where: { published: true },
            orderBy: { year: "desc" },
            take: 4,
        });
    } catch (error) {
        console.error("Failed to fetch past events:", error);
    }

    return <Past4EventsClient initialEvents={events} />;
};

export default Past4Events;