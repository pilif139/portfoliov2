// noinspection Annotator

"use client"

import FadeDiv from "@/components/ui/FadeDiv"
import Heading from "@/components/ui/Heading"
import Link from "next/link"
import React, { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import login from "@/server/auth/login"
import { useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "@/server/auth/loginTypes"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import useValidate from "@/hooks/useValidate"
import useDebounce from "@/hooks/useDebounce"

export default function Login() {
    const [state, action] = useFormState(login, undefined)
    const [email, setEmail] = useState("")
    const [emailErrors, setEmailErrors, validateEmail] = useValidate(LoginSchema.shape.email, email)
    const [password, setPassword] = useState("")
    const [passwordErrors, setPasswordErrors, validatePassword] = useValidate(LoginSchema.shape.password, password)
    const queryClient = useQueryClient()
    const [debounce] = useDebounce()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await new Promise((resolve) => setTimeout(resolve, 300))
        if (emailErrors || passwordErrors) return
        await queryClient.invalidateQueries({ queryKey: ["session"] }) // Invalidate session query works on the cache of react query if some page is fetching the session from the api and not the db
        const formData = new FormData(e.target as HTMLFormElement)
        action(formData)
        setEmailErrors([...(state?.errors?.email || [])])
        setPasswordErrors([...(state?.errors?.password || [])])
    }

    return (
        <FadeDiv className="flex flex-col gap-4">
            <Heading variant="2">Login</Heading>
            <form className="flex flex-col gap-1 text-xl w-[28em]" onSubmit={handleSubmit}>
                <Input
                    type="email"
                    label="Email"
                    id="email"
                    name="email"
                    required
                    placeholder="email..."
                    errors={emailErrors}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        debounce(() => {
                            validateEmail()
                        }, 300)
                    }}
                />
                <Input
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                    required
                    placeholder="password..."
                    errors={passwordErrors}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        debounce(() => {
                            validatePassword()
                        }, 300)
                    }}
                    value={password}
                />
                <p className="text-xl mb-2">
                    You don&apos;have an account?{" "}
                    <Link href={"/register"} className="text-theme-10">
                        Sign up
                    </Link>
                </p>
                <LoginButton />
            </form>
        </FadeDiv>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending} variant="primary">
            {pending ? "loading..." : "Login"}
        </Button>
    )
}
