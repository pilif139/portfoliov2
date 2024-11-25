"use client";

import FadeDiv from "@/components/ui/FadeDiv";
import Heading from "@/components/ui/Heading";
import { useEffect } from "react";
import Button from "@/components/ui/Button";

type ErrorPageProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <FadeDiv
            className="m-auto text-center flex flex-col gap-4 items-center"
        >
            <Heading variant="1" className="text-nord-11">Error occurred</Heading>
            <p className="text-2xl">{error.message}</p>
            <Button onClick={() => reset()} variant="primary">Go back</Button>
        </FadeDiv>
    )
}