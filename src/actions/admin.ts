// src/actions/admin.ts (New code)
"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function uploadAndSavePrints(formData: FormData) {
  const titleInput = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const isForSale = formData.get("isForSale") === "true";
  const imageFiles = formData.getAll("images") as File[];

  if (!imageFiles || imageFiles.length === 0 || (imageFiles.length === 1 && imageFiles[0].size === 0)) {
    throw new Error("Missing required image files.");
  }

  // Fallback title if left blank
  const finalTitle = titleInput.trim() || "Untitled Art Piece";

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    if (file.size === 0) continue;

    // 1. Convert the file to Base64 for ImgBB
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // 2. Upload to ImgBB
    const imgbbForm = new URLSearchParams();
    imgbbForm.append("key", process.env.IMGBB_API_KEY!);
    imgbbForm.append("image", base64Image);

    const imgRes = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imgbbForm,
    });

    const imgData = await imgRes.json();
    
    if (!imgData.success) {
      throw new Error(`Failed to upload image ${i + 1} to ImgBB`);
    }

    const imageUrl = imgData.data.url;

    // If multiple files, append indices to make titles unique
    const uniqueTitle = imageFiles.length > 1 ? `${finalTitle} #${i + 1}` : finalTitle;

    // 3. Save to Neon Database
    await prisma.print.create({
      data: {
        title: uniqueTitle,
        description: description || null,
        imageUrl,
        price: price ? parseInt(price) * 100 : null,
        isForSale,
      },
    });
  }

  revalidatePath("/");
}

// Add this to the bottom of src/actions/admin.ts

export async function getAdminPrints() {
  return await prisma.print.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deletePrint(id: string) {
  await prisma.print.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/shop");
}

export async function updatePrint(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const isForSale = formData.get("isForSale") === "true";

  await prisma.print.update({
    where: { id },
    data: {
      title: title.trim() || "Untitled Art Piece",
      description: description || null,
      price: price ? parseInt(price) * 100 : null,
      isForSale,
    },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/shop");
}