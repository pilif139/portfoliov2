"use client"

import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableContent } from "./SortableContent"
import CustomPointerSensor from "./CustomPointerSensor"
import { useCreatePostContext } from "@/components/CreatePostContextProvider"
import Content from "@/components/Content"
import React from "react"
import Button from "@/components/ui/Button"

export default function ContentsList() {
    const { contents, setContents } = useCreatePostContext()

    const sensors = useSensors(
        useSensor(CustomPointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const deleteElement = (position: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setContents((contents) => {
            return contents
                .filter((content) => content.position !== position)
                .map((content, index) => ({ ...content, position: index + 1 }))
        })
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={contents.map(({ position }) => position as number)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4 w-full">
                    {contents.map((content) => {
                        const position = content.position as number
                        return (
                            <SortableContent key={position} id={position}>
                                <Content content={content} />
                                <DeleteButton onClick={(e) => deleteElement(position, e)} />
                            </SortableContent>
                        )
                    })}
                </div>
            </SortableContext>
        </DndContext>
    )

    function handleDragEnd(event: DragEndEvent): void {
        const { active, over } = event

        if (active.id !== over?.id) {
            setContents((contents) => {
                const oldIndex = contents.findIndex(({ position }) => position === active.id)
                const newIndex = contents.findIndex(({ position }) => position === over?.id)

                return arrayMove(contents, oldIndex, newIndex).map((content, index) => {
                    return {
                        ...content,
                        position: index + 1, // Update positions to be sequential
                    }
                })
            })
        }
    }
}

function DeleteButton({ onClick }: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <Button
            onClick={onClick}
            variant="secondary"
            className="text-white bg-theme-11 hover:bg-red-400 border-none duration-300 transition-colors rounded-lg h-fit"
        >
            X
        </Button>
    )
}
