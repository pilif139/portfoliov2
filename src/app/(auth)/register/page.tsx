"use client"

import React, { startTransition, useActionState, useState } from "react"
import register from "@/server/auth/register"
import Link from "next/link"
import Heading from "@/components/ui/Heading"
import FadeDiv from "@/components/ui/FadeDiv"
import Input from "@/components/ui/Input"
import { RegisterSchema } from "@/server/auth/registerTypes"
import Button from "@/components/ui/Button"
import useValidate from "@/hooks/useValidate"
import useDebounce from "@/hooks/useDebounce"

export default function Register() {
    const [state, action, pending] = useActionState(register, undefined)
    const [username, setUsername] = useState("")
    const [usernameErrors, setUsernameErrors, validateUsername] = useValidate(RegisterSchema.shape.username, username)
    const [email, setEmail] = useState("")
    const [emailErrors, setEmailErrors, validateEmail] = useValidate(RegisterSchema.shape.email, email)
    const [password, setPassword] = useState("")
    const [passwordErrors, setPasswordErrors, validatePassword] = useValidate(RegisterSchema.shape.password, password)
    const [debounce] = useDebounce()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await new Promise((resolve) => setTimeout(resolve, 300)) // ensures that the errors are set before the form is submitted
        if (usernameErrors || emailErrors || passwordErrors) return
        const formData = new FormData(e.target as HTMLFormElement)
        startTransition(() => {
            action(formData)
        })
        setUsernameErrors(state?.errors?.username ? [...state?.errors?.username] : null)
        setEmailErrors(state?.errors?.email ? [...state?.errors?.email] : null)
        setPasswordErrors(state?.errors?.password ? [...state?.errors?.password] : null)
    }

    return (
        <FadeDiv className="flex flex-col gap-4">
            <Heading variant="2">Register</Heading>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 text-xl w-[28em]">
                <Input
                    type="text"
                    label="Username"
                    id="username"
                    name="username"
                    required
                    placeholder="username..."
                    errors={usernameErrors}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                        debounce(() => {
                            validateUsername()
                        }, 300)
                    }}
                />
                <Input
                    type="email"
                    label="Email"
                    id="email"
                    name="email"
                    required
                    placeholder="email..."
                    errors={emailErrors}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        debounce(() => {
                            validateEmail()
                        }, 300)
                    }}
                    value={email}
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
                    Already have an account?{" "}
                    <Link href={"/login"} className="text-theme-10">
                        Login
                    </Link>
                </p>
                <RegisterButton pending={pending} />
            </form>
        </FadeDiv>
    )
}

function RegisterButton({ pending }: { pending: boolean }) {
    return (
        <Button type="submit" disabled={pending} variant="primary">
            {pending ? "loading..." : "Register"}
        </Button>
    )
}
