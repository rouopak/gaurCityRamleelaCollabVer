import React from 'react';
import prisma from "@/lib/prisma";
import MainMembersClient from "./MainMembersClient";

const MainMembers = async () => {
    let members = [];
    try {
        members = await prisma.member.findMany({
            where: { published: true },
            orderBy: { order: "asc" },
            take: 4,
        });
    } catch (error) {
        console.error("Failed to fetch main members:", error);
    }

    return <MainMembersClient initialMembers={members} />;
};

export default MainMembers;