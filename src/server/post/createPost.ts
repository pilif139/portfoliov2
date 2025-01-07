"use server";

import {
  post_content_blocksTable,
  PostContentBlock,
  postsTable,
} from "@/db/schema/posts";
import db from "@/db/db";
import { z } from "zod";
import { contentType } from "@/db/schema/projects";
import { getCurrentSession } from "@/lib/auth/session";

const PostPayloadSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(150, { message: "Title must be at most 150 characters long" }),
  description: z
    .string()
    .min(7, { message: "Description must be at least 7 characters long" })
    .max(250, { message: "Description must be at most 250 characters long" }),
  contents: z.array(
    z.object({
      type: z.enum(contentType.enumValues),
      content: z.string().min(1),
      position: z.number().min(1),
    })
  ),
});

type PostPayload = z.infer<typeof PostPayloadSchema>;
type PostPayloadParameter = Omit<PostPayload, "contents"> & {
  contents: Partial<PostContentBlock>[];
};

export default async function CreatePost(PostPayload: PostPayloadParameter) {
  const { user, session } = await getCurrentSession();
  if (!user || !session || user.role !== "admin") {
    return {
      errors: {
        user: "Current user either isn't logged in or doesn't have the required permissions",
      },
    };
  }

  const validatePayload = PostPayloadSchema.safeParse({
    ...PostPayload,
  });
  if (!validatePayload.success) {
    return { errors: validatePayload.error.flatten().fieldErrors };
  }

  const { title, description, contents } = validatePayload.data;

  try {
    const { post_id } = await db.transaction(async (tx) => {
      const [post] = await tx
        .insert(postsTable)
        .values({ title, description, author_id: user.id })
        .returning({ id: postsTable.id })
        .execute();
      const post_id = post.id;

      await Promise.all(
        contents.map(async (content) => {
          const isFile =
            content.type === "file" ||
            content.type === "image" ||
            content.type === "video";
          await tx
            .insert(post_content_blocksTable)
            .values({
              post_id: post_id,
              type: content.type,
              content: isFile ? "" : content.content,
              position: content.position,
            })
            .execute();
        })
      );

      return { post_id };
    });

    return { post_id };
  } catch (error) {
    console.error("Transaction failed:", error);
    return { errors: "Transaction failed" };
  }
}
