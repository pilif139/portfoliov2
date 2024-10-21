"use server"

import {FormState, LoginSchema} from "@/server/auth/loginTypes";
import db from "@/db/db";
import {userTable} from "@/db/schema/users";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import {createSession, generateSessionToken} from "@/lib/auth/session";
import {setSessionTokenCookie} from "@/lib/auth/cookies";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function login(state: FormState, formData: FormData) : Promise<FormState> {
    const validateFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validateFields.success) {
        return {errors: validateFields.error.flatten().fieldErrors};
    }

    const { email, password } = validateFields.data;

    const user = await db.select().from(userTable).where(eq(userTable.email, email)).execute();
    if(user.length < 1){
        return {errors: {email: ["User with this email doesn't exist"]}};
    }

    if(!await bcrypt.compare(password, user[0].password)){
        return {errors: {password: ["Incorrect password or email."]}};
    }

    const token = generateSessionToken();
    const session = await createSession(token, user[0].id);
    setSessionTokenCookie(token, session.expiresAt);

    revalidatePath("/", "layout");
    redirect("/");
}