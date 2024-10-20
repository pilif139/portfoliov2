import 'server-only';
import {adminAuth} from "@/firebase/serverApp";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function createSession(tokenId: string) {
  const crsfToken = cookies().get('csrfToken');
  if(!crsfToken){
        throw new Error('CSRF token not found');
  }
  const decodedToken = await adminAuth.verifyIdToken(tokenId);
  if(new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60){
    throw new Error('Recent sign-in required. You are trying to create a session with an old token');
  }
  // create a session
  const expiresIn = + 60 * 60 * 24 * 5;
  const options = {maxAge: expiresIn, httpOnly: true, secure: true };
  try {
    const sessionCookie = await adminAuth.createSessionCookie(tokenId, {expiresIn: expiresIn})

    cookies().set('session', sessionCookie, options);

    redirect('/');
  } catch(error : Error | any){
    throw new Error('Failed to create session - ' + error.message);
  }
}

export async function verifySession(tokenId : string) {
    try {
        return await adminAuth.verifySessionCookie(tokenId, true);
    } catch(error : Error | any) {
        redirect('/login');
    }
}