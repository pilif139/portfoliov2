"use server";

import db from "@/db/db";
import { post_content_blocksTable } from "@/db/schema/posts";
import { put } from "@vercel/blob";
import { and, eq } from "drizzle-orm";

export type FileContent = {
    post_id: number;
    position: number;
    type: "file" | "image" | "video";
    content: File;
};

export default async function submitFileToVercelStorage(formData: FormData) {
  const file = formData.get("file") as File;
  const post_id = parseInt(formData.get("post_id") as string);
  const position = parseInt(formData.get("position") as string);
  const type = formData.get("type") as "file" | "image" | "video";

  if (!file || !type || !position || !post_id) {
    throw new Error(
      "File content, type, position and post_id are required to submit the file to the server"
    );
  }
  if (file.size >= 1024 * 1024 * 4.5) {
    throw new Error("File size must be less than 4.5MB");
  }
  if (!file.name) {
    console.log(file);
    throw new Error("File name is required");
  }

  const blob = await put(file.name, file, {
    access: "public",
  });

  await db
    .update(post_content_blocksTable)
    .set({ content: blob.url })
    .where(
      and(
        eq(post_content_blocksTable.position, position),
        eq(post_content_blocksTable.post_id, post_id),
        eq(post_content_blocksTable.content, "")
      )
    )
    .execute();
}
