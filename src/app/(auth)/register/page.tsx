"use client"

import React from "react";
import {useFormState, useFormStatus} from 'react-dom'
import register from "@/server/auth/register";
import Link from "next/link";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/clientApp";

export default function Register(){
  const [state, action] = useFormState(register, undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user?.uid;
      const tokenId = await userCredential.user?.getIdToken();
      formData.append("uid", uid);
      formData.append("tokenId", tokenId);
      action(formData);
    } catch(error : Error | any){
        throw new Error("Failed to create user with a firebase auth - " + error.message);
    }
  }

    return (
        <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}
                className="flex flex-col gap-1 text-xl w-[28em]">
            <label htmlFor="username">Username</label>
            <input type="text"
                   id="username"
                   name="username"
                   required
                   placeholder="username..."
                   className="w-full rounded-xl p-2 text-black outline-none transition focus:bg-slate-100 dark:focus:bg-slate-200"
            />
            {state?.errors?.username && state.errors.username.map((error: string, id) => (
                <li key={id} className="text-red-500">{error}</li>))}
            <label htmlFor="email">Email</label>
            <input type="email"
                   id="email"
                   name="email"
                   required
                   placeholder="email..."
                   className="w-full rounded-xl p-2 text-black outline-none transition focus:bg-slate-100 dark:focus:bg-slate-200"
            />
            {state?.errors?.email && state.errors.email.map((error: string, id) => (
                <li key={id} className="text-red-500">{error}</li>))}
            <label htmlFor="password">Password</label>
            <input type="password"
                   id="password"
                   name="password"
                   required
                   placeholder="password..."
                   className="w-full rounded-xl p-2 text-black outline-none transition focus:bg-slate-100 dark:focus:bg-slate-200"
            />
            {state?.errors?.password && state.errors.password.map((error: string, id) => (
                <li key={id} className="text-red-500">{error}</li>))}
            <RegisterButton/>
          </form>
          <p className="text-xl">
            Already have an account? <Link href={"/login"} className="text-violet-500">Login</Link>
          </p>
        </div>
    );
}

export function RegisterButton() {
  const {pending} = useFormStatus();
  return (
      <button
          type="submit"
          aria-disabled={pending}
          className="mt-4 w-max self-center rounded-2xl bg-violet-500 p-2 px-8 text-xl text-white transition hover:bg-violet-600">
        {pending ? "loading...": "Register"}
      </button>
  )
}