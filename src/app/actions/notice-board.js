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
            { folder: "ramleela/notice" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export async function getNotice() {
    return prisma.noticeBoard.findMany({ orderBy: { publishDate: "desc" } });
}

export async function createNotice(formData) {
    await requireAuth();

    const title = formData.get("title");
    const description = formData.get("description");
    const publishDate = formData.get("publishDate")
        ? new Date(formData.get("publishDate"))
        : new Date();
    const published = formData.get("published") === "true";

    const imageFile = formData.get("image");
    const image = await uploadImage(imageFile);

    await prisma.noticeBoard.create({
        data: { title, description, image, publishDate, published },
    });

    revalidatePath("/admin/notice-board");
    revalidatePath("/NoticeBoard");
    return { success: true };
}

export async function updateNotice(id, formData) {
    await requireAuth();

    const title = formData.get("title");
    const description = formData.get("description");
    const publishDate = formData.get("publishDate")
        ? new Date(formData.get("publishDate"))
        : undefined;
    const published = formData.get("published") === "true";

    const data = { title, description, published };
    if (publishDate) data.publishDate = publishDate;

    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
        data.image = await uploadImage(imageFile);
    }

    await prisma.noticeBoard.update({ where: { id }, data });

    revalidatePath("/admin/notice-board");
    revalidatePath("/NoticeBoard");
    return { success: true };
}

export async function deleteNotice(id) {
    await requireAuth();
    await prisma.noticeBoard.delete({ where: { id } });
    revalidatePath("/admin/notice-board");
    revalidatePath("/NoticeBoard");
    return { success: true };
}
