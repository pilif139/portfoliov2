import { getCurrentSession } from "@/lib/auth/session";
import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;
   
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
   
          try {
            // insert the content block with blob.url into the database with their position and post_id from request params
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