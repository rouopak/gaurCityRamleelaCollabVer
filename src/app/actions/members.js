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
            { folder: "ramleela/members" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export async function getMembers() {
    return prisma.member.findMany({ orderBy: { order: "asc" } });
}

export async function createMember(formData) {
    await requireAuth();

    const name = formData.get("name");
    const role = formData.get("role");
    const order = parseInt(formData.get("order") || "0");
    const published = formData.get("published") === "true";

    const photoFile = formData.get("photo");
    const photo = await uploadImage(photoFile);

    await prisma.member.create({
        data: { name, role, photo, order, published },
    });

    revalidatePath("/admin/members");
    revalidatePath("/members");
    return { success: true };
}

export async function updateMember(id, formData) {
    await requireAuth();

    const name = formData.get("name");
    const role = formData.get("role");
    const order = parseInt(formData.get("order") || "0");
    const published = formData.get("published") === "true";

    const data = { name, role, order, published };

    const photoFile = formData.get("photo");
    if (photoFile && photoFile.size > 0) {
        data.photo = await uploadImage(photoFile);
    }

    await prisma.member.update({ where: { id }, data });

    revalidatePath("/admin/members");
    revalidatePath("/members");
    return { success: true };
}

export async function deleteMember(id) {
    await requireAuth();
    await prisma.member.delete({ where: { id } });
    revalidatePath("/admin/members");
    revalidatePath("/members");
    return { success: true };
}
