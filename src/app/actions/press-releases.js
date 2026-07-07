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
            { folder: "ramleela/press" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export async function getPressReleases() {
    return prisma.pressRelease.findMany({ orderBy: { publishDate: "desc" } });
}

export async function createPressRelease(formData) {
    await requireAuth();

    const title = formData.get("title");
    const content = formData.get("content");
    const publishDate = formData.get("publishDate")
        ? new Date(formData.get("publishDate"))
        : new Date();
    const published = formData.get("published") === "true";

    const imageFile = formData.get("image");
    const image = await uploadImage(imageFile);

    await prisma.pressRelease.create({
        data: { title, content, image, publishDate, published },
    });

    revalidatePath("/admin/press-releases");
    revalidatePath("/pressRelease");
    return { success: true };
}

export async function updatePressRelease(id, formData) {
    await requireAuth();

    const title = formData.get("title");
    const content = formData.get("content");
    const publishDate = formData.get("publishDate")
        ? new Date(formData.get("publishDate"))
        : undefined;
    const published = formData.get("published") === "true";

    const data = { title, content, published };
    if (publishDate) data.publishDate = publishDate;

    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
        data.image = await uploadImage(imageFile);
    }

    await prisma.pressRelease.update({ where: { id }, data });

    revalidatePath("/admin/press-releases");
    revalidatePath("/pressRelease");
    return { success: true };
}

export async function deletePressRelease(id) {
    await requireAuth();
    await prisma.pressRelease.delete({ where: { id } });
    revalidatePath("/admin/press-releases");
    revalidatePath("/pressRelease");
    return { success: true };
}
