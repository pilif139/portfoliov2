"use client"

import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS, Transform } from "@dnd-kit/utilities"

export function SortableContent({ id, children }: { id: number; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id })

    const modifiedTransform = {
        ...transform,
        scaleX: isDragging ? 1.05 : 1, // Slightly scale up when dragging
        scaleY: isDragging ? 1.05 : 1, // Slightly scale up when dragging
    }

    const style = {
        transform: CSS.Transform.toString(modifiedTransform as Transform),
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: isDragging ? "grabbing" : "grab",
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`rounded-lg p-2 flex justify-between ${isDragging ? "bg-theme-0" : "bg-theme-2"}`}>
            {children}
        </div>
    )
}
