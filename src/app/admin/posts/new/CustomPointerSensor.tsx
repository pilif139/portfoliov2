import { PointerEvent } from "react"

import { PointerSensor, PointerSensorOptions } from "@dnd-kit/core"

export default class CustomPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: "onPointerDown" as const,

            handler: ({ nativeEvent: event }: PointerEvent, { onActivation }: PointerSensorOptions) => {
                if (!event.isPrimary || event.button !== 0 || isInteractiveElement(event.target as HTMLElement)) {
                    return false
                }
                onActivation?.({ event })
                return true
            },
        },
    ]
}

function isInteractiveElement(element: HTMLElement) {
    const interactiveElements = ["button", "input", "textarea", "select", "option"]

    return interactiveElements.includes(element.tagName.toLowerCase())
}
