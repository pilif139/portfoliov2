"use client"

import { useRouter } from "next/navigation"
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io"

// experimental, not working
export default function Navigation() {
    const router = useRouter()

    const goBack = () => {
        if (window.history.length > 1) {
            console.log(window.history.length)
            console.log("back")
            router.back()
        }
    }

    const goForward = () => {
        if (window.history.pushState.length < window.history.length) {
            console.log(window.history.pushState.length)
            console.log(window.history.length)
            console.log("forward")
            router.forward()
        }
    }

    return (
        <div className="flex text-xl">
            <IoMdArrowRoundBack size={40} onClick={goBack} className="cursor-pointer" />
            <IoMdArrowRoundForward size={40} onClick={goForward} className="cursor-pointer" />
        </div>
    )
}
