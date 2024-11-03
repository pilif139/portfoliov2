"use server";

import db from "@/db/db";
import { post_content_blocksTable, PostContentBlock } from "@/db/schema/posts";
import {base64ToBlob} from "@/lib/utils/base64ToFile";
import { and, eq } from "drizzle-orm";

export default async function submitFileOnLocalhost(post_id: number, files: Partial<PostContentBlock>[]){
    for (const file of files) {
        if(!file.content || !file.position){
            throw new Error("File content or position is missing");
        }
        const blob = base64ToBlob(file.content as string, `${post_id}-${file.position}`);
        const fileUrl = URL.createObjectURL(blob);
        await db
            .update(post_content_blocksTable)
            .set({ content: fileUrl })
            .where(
                and(
                    eq(post_content_blocksTable.position, file.position),
                    eq(post_content_blocksTable.post_id, post_id)
                )
            )
            .execute();
    };
}