"use client";

import Button from "./ui/Button";
import Heading from "./ui/Heading";
import { useCreatePostContext } from "./CreatePostContextProvider";

export default function CreatePostForm({ handleCreatePost } : { handleCreatePost: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    const { title, setTitle, description, setDescription } = useCreatePostContext();

  return (
    <form className="w-max h-max bg-nord-0 rounded-xl p-4 flex flex-col gap-4">
      <Heading variant="3">Post details</Heading>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        className="p-2 rounded-lg bg-nord-1 text-nord-9"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        className="p-2 rounded-lg bg-nord-1 text-nord-9 w-96 min-h-max  max-h-[30vh]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <Button
        className="bg-nord-14 hover:bg-nord-13 px-10 py-4 text-2xl mt-auto"
        onClick={handleCreatePost}
      >
        Create post
      </Button>
    </form>
  );
}
