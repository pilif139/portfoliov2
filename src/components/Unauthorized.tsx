import Link from "next/link"
import Button from "./ui/Button"
import FadeDiv from "./ui/FadeDiv"
import Heading from "./ui/Heading"

export default function Unauthorized() {
    return (
        <FadeDiv className="m-auto flex gap-2 flex-col items-center">
            <Heading className="text-theme-11" variant="1">
                Access denied!
            </Heading>
            <Link href="/">
                <Button variant="primary">Go back to home page</Button>
            </Link>
        </FadeDiv>
    )
}
