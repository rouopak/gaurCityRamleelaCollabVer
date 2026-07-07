"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

async function requireAuth() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return session;
}

async function uploadImage(file) {
    if (!file || file.size === 0) return null;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "ramleela/achievements" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export async function getAchievements() {
    return prisma.achievement.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createAchievement(formData) {
    await requireAuth();

    const title = formData.get("title");
    const description = formData.get("description");
    const year = formData.get("year") ? parseInt(formData.get("year")) : null;
    const published = formData.get("published") === "true";

    const imageFile = formData.get("image");
    const image = await uploadImage(imageFile);

    await prisma.achievement.create({
        data: { title, description, year, image, published },
    });

    revalidatePath("/admin/achievements");
    revalidatePath("/achivement");
    return { success: true };
}

export async function updateAchievement(id, formData) {
    await requireAuth();

    const title = formData.get("title");
    const description = formData.get("description");
    const year = formData.get("year") ? parseInt(formData.get("year")) : null;
    const published = formData.get("published") === "true";

    const data = { title, description, year, published };

    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
        data.image = await uploadImage(imageFile);
    }

    await prisma.achievement.update({ where: { id }, data });

    revalidatePath("/admin/achievements");
    revalidatePath("/achivement");
    return { success: true };
}

export async function deleteAchievement(id) {
    await requireAuth();
    await prisma.achievement.delete({ where: { id } });
    revalidatePath("/admin/achievements");
    revalidatePath("/achivement");
    return { success: true };
}
