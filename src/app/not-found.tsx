import FadeDiv from "@/components/ui/FadeDiv"
import Heading from "@/components/ui/Heading"

export default function NotFound() {
    return (
        <FadeDiv className="m-auto text-center">
            <Heading variant="1" className="text-nord-11">
                404 Error
            </Heading>
            <p className="text-3xl">Page not found</p>
        </FadeDiv>
    )
}
