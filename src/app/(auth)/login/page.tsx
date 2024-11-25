"use client";

import FadeDiv from "@/components/ui/FadeDiv";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import login from "@/server/auth/login";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
    const [state, action] = useFormState(login, undefined);
    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await queryClient.invalidateQueries({ queryKey: ["session"] });
        const formData = new FormData(e.target as HTMLFormElement);
        action(formData);
    }

    return (
        <FadeDiv className="flex flex-col gap-4">
            <Heading variant="2">Login</Heading>
            <form className="flex flex-col gap-1 text-xl w-[28em]" onSubmit={handleSubmit}>
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
                <p className="text-xl mb-2">
                    You don&apos;have an account? <Link href={"/register"} className="text-nord-10">Sign up</Link>
                </p>
                <LoginButton />
            </form>
        </FadeDiv>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="w-max rounded-2xl bg-nord-10 hover:bg-nord-9 p-3 px-12 text-xl text-nord-6 transition">
            {pending ? "loading..." : "Login"}
        </button>
    )
}