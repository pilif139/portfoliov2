"use client";

import Heading, { HeadingProps } from "@/components/ui/Heading";
import { PostContentBlock } from "@/db/schema/posts";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableContent } from "./SortableContent";
import CustomPointerSensor from "./CustomPointerSensor";

type ContentsListProps = {
    contents: Partial<PostContentBlock>[];
    setContents: React.Dispatch<React.SetStateAction<Partial<PostContentBlock>[]>>;
}

export default function ContentsList({contents, setContents}: ContentsListProps){
    const sensors = useSensors(
        useSensor(CustomPointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

    const deleteElement = (position: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const newContents = contents.filter((content) => content.position !== position);
        setContents(newContents);
    }

        return (
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={contents.map(({position}) => position as number)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {contents.map((content, id) => {
                                const position = content.position as number;

                                if(content.type === "h1" || content.type === "h2" || content.type === "h3" || content.type === "h4"){
                                    const variant = content.type.slice(1) as HeadingProps["variant"];
                                    return (
                                        <SortableContent id={position} key={id}>
                                                <Heading variant={variant}>{content.content}</Heading>
                                                <button onClick={(e) => deleteElement(position,e)} className="p-2 text-white bg-nord-11 rounded-lg">X</button>
                                        </SortableContent>
                                    )
                                }
                                if(content.type === "p"){
                                    return (
                                        <SortableContent id={position} key={id}>
                                                <p>{content.content}</p>
                                                <button onClick={(e) => deleteElement(position,e)} className="p-2 text-white bg-nord-11 rounded-lg">X</button>
                                        </SortableContent>
                                    )
                                }
                        })}
                    </div>
                </SortableContext>
            </DndContext>
        );

        function handleDragEnd(event: DragEndEvent): void {
            const { active, over } = event;

            if (active.id !== over?.id) {
                
                setContents((contents) => {
                    const oldIndex = contents.findIndex(({ position }) => position === active.id);
                    const newIndex = contents.findIndex(({ position }) => position === over?.id);
            
                    return arrayMove(contents, oldIndex, newIndex).map((content, index) => ({
                      ...content,
                      position: index + 1, // Update positions to be sequential
                    }));
                });
            }
        }

}
