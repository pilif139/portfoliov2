"use client";

import Heading from "@/components/ui/Heading";
import { PostContentBlock } from "@/db/schema/posts";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import { SortableContent } from "./SortableContent";
import CustomPointerSensor from "./CustomPointerSensor";
import Image from "next/image";
import { useCreatePostContext } from "@/components/CreatePostContextProvider";

export default function ContentsList(){
    const { contents, setContents } = useCreatePostContext();

    const sensors = useSensors(
        useSensor(CustomPointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

    const contentMap = (content: Partial<PostContentBlock>) : { [key : string]: () => JSX.Element }=> ({
        "h1": () => (
            <Heading variant="1">{content.content}</Heading>
        ),
        "h2": () => (
            <Heading variant="2">{content.content}</Heading>
        ),
        "h3": () => (
            <Heading variant="3">{content.content}</Heading>
        ),
        "h4": () => (
            <Heading variant="4">{content.content}</Heading>
        ),
        "p": () => (
            <p>{content.content}</p>
        ),
        "image": () => (
            <Image src={content.content as string} alt="img" width={350} height={350} className="rounded-xl shadow-gray-900 shadow-lg"/>
        ),
        "video": () => (
            <video src={content.content as string} controls width="350" height="350" className="rounded-xl shadow-gray-900 shadow-lg"/>
        ),
        "file": () => (
            <a href={content.content as string} download className="bg-nord-10 px-4 py-2 rounded-xl">Download file</a>
        ),
    });


    const deleteElement = (position: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const newContents = contents
                .filter((content) => content.position !== position)
                .map((content, index) => ({...content, position: index + 1}));
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
                >
                    <div className="space-y-4">  
                        {contents.map((content) => {
                                const position = content.position as number;
                                const type = content.type as string;
                                const ContentComponent = contentMap(content)[type];
                                return (
                                    <SortableContent key={position} id={position}>
                                            <ContentComponent />
                                            <DeleteButton onClick={(e) => deleteElement(position, e)} />
                                    </SortableContent>
                                )
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

function DeleteButton({onClick} : {onClick: (e: React.MouseEvent<HTMLButtonElement>) => void}){
    return (
        <button onClick={onClick} className="p-2 text-white bg-nord-11 hover:bg-red-400 duration-300 transition-colors rounded-lg h-fit">X</button>
    )
}