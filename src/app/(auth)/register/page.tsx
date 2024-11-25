"use client"

import React from "react";
import register from "@/server/auth/register";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import FadeDiv from "@/components/ui/FadeDiv";
import { useFormState, useFormStatus } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Register() {
    const [state, action] = useFormState(register, undefined);

    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await queryClient.invalidateQueries({ queryKey: ["session"] });
        const formData = new FormData(e.target as HTMLFormElement);
        action(formData);
    }

    return (
        <FadeDiv className="flex flex-col gap-4">
            <Heading variant="2">Register</Heading>
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
                <p className="text-xl mb-2">
                    Already have an account? <Link href={"/login"} className="text-nord-10">Login</Link>
                </p>
                <RegisterButton />
            </form>
        </FadeDiv>
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="w-max rounded-2xl bg-nord-10 hover:bg-nord-9 p-3 px-12 text-xl text-nord-6 transition">
            {pending ? "loading..." : "Register"}
        </button>
    )
}