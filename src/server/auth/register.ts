"use server";

import { Users } from "@/db/schema/users";
import bcrypt from 'bcrypt';
import db from "@/db/db";
import {FormState, RegisterSchema} from "./registerTypes";
import { eq } from "drizzle-orm";
import {adminAuth} from "@/firebase/serverApp";
import {createSession} from "@/lib/auth/session";

export default async function register(state: FormState, formData: FormData) : Promise<FormState> {
  const validateFields = RegisterSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validateFields.success) {
    return {errors: validateFields.error.flatten().fieldErrors};
  }

  const { username, email, password } = validateFields.data;

  const existingUser = await db.select().from(Users).where(eq(Users.email,email)).execute();
  if (existingUser.length > 0) {
    return {errors: {email: ["Email already exists"]}};
  }

  const uid = formData.get('uid') as string;
  const tokenId = formData.get('tokenId') as string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // inserting into database
    await db
        .insert(Users)
        .values({
          uid,
          username,
          email,
          password: hashedPassword,
        }).execute();

    // cookie handling
    await createSession(tokenId);
  } catch (error : Error | any) {
    throw new Error("Failed to create user - "+error.message);
  }
}