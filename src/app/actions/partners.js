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
            { folder: "ramleela/partners" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export async function getPartners() {
    return prisma.partner.findMany({ orderBy: { order: "asc" } });
}

export async function createPartner(formData) {
    await requireAuth();

    const name = formData.get("name");
    const website = formData.get("website") || null;
    const order = parseInt(formData.get("order") || "0");
    const published = formData.get("published") === "true";

    const logoFile = formData.get("logo");
    const logo = await uploadImage(logoFile);

    await prisma.partner.create({
        data: { name, logo, website, order, published },
    });

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}

export async function updatePartner(id, formData) {
    await requireAuth();

    const name = formData.get("name");
    const website = formData.get("website") || null;
    const order = parseInt(formData.get("order") || "0");
    const published = formData.get("published") === "true";

    const data = { name, website, order, published };

    const logoFile = formData.get("logo");
    if (logoFile && logoFile.size > 0) {
        data.logo = await uploadImage(logoFile);
    }

    await prisma.partner.update({ where: { id }, data });

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}

export async function deletePartner(id) {
    await requireAuth();
    await prisma.partner.delete({ where: { id } });
    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}
