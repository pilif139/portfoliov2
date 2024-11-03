import db from "@/db/db";
import { post_content_blocksTable } from "@/db/schema/posts";
import { getCurrentSession } from "@/lib/auth/session";
import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;
    const searchParams = request.nextUrl.searchParams;
    const post_id = searchParams.get('post_id');
    const position = searchParams.get('position');
   
    try {
      const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (
          /* clientPayload */
        ) => {
          const { user, session } = await getCurrentSession();
            if (!user || !session) {
                throw new Error('User not found');
            }
            if(user.role !== 'admin'){
                throw new Error('User is not authorized to upload files to the server!');
            }
            if (!post_id || !position) {
              throw new Error('Post id and position are required to insert the file url into the database');
            }
   
          return {
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
            tokenPayload: JSON.stringify({
              "userId": user.id,
            }),
          };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
          // ⚠️ This will not work on `localhost` websites,
          // Use ngrok or similar to get the full upload flow
   
          console.log('blob upload completed', blob, tokenPayload);

          const url = await blob.url;
   
          try {
            // insert the content block with blob.url into the database with their position and post_id from request params
            await db
              .update(post_content_blocksTable)
              .set({content: url || 'there should be a url here'})
              .where(
                and(
                  eq(post_content_blocksTable.position, parseInt(position!)),
                  eq(post_content_blocksTable.post_id, parseInt(post_id!)),
                ),
              )
              .execute();
          } catch (error : Error | unknown) {
            throw new Error('Could not update user'+error);
          }
        },
      });
   
      return NextResponse.json(jsonResponse);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }, // The webhook will retry 5 times waiting for a 200
      );
    }
  }