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
            { folder: "ramleela/events" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export async function getEvents() {
    return prisma.event.findMany({
        orderBy: { year: "desc" },
    });
}

export async function getEvent(id) {
    return prisma.event.findUnique({ where: { id } });
}

export async function createEvent(formData) {
    await requireAuth();

    const title = formData.get("title");
    const year = parseInt(formData.get("year"));
    const description = formData.get("description");
    const published = formData.get("published") === "true";
    
    // Handle single cover image upload
    const imageFile = formData.get("image");
    const images = [];
    
    if (imageFile && imageFile.size > 0) {
        const url = await uploadImage(imageFile);
        if (url) images.push(url);
    }

    await prisma.event.create({
        data: { title, year, description, images, published },
    });

    revalidatePath("/admin/events");
    revalidatePath("/prevEvent");
    return { success: true };
}

export async function updateEvent(id, formData) {
    await requireAuth();

    const title = formData.get("title");
    const year = parseInt(formData.get("year"));
    const description = formData.get("description");
    const published = formData.get("published") === "true";
    
    // Get existing image
    const existing = await prisma.event.findUnique({ where: { id }, select: { images: true } });
    let images = existing?.images || [];
    
    // Handle new single image upload (replaces existing)
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
        const url = await uploadImage(imageFile);
        if (url) images = [url];
    }

    await prisma.event.update({
        where: { id },
        data: { title, year, description, images, published },
    });

    revalidatePath("/admin/events");
    revalidatePath("/prevEvent");
    return { success: true };
}

export async function deleteEvent(id) {
    await requireAuth();
    await prisma.event.delete({ where: { id } });
    revalidatePath("/admin/events");
    revalidatePath("/prevEvent");
    return { success: true };
}
