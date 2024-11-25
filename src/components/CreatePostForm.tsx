"use client";

import Button from "./ui/Button";
import Heading from "./ui/Heading";
import { useCreatePostContext } from "./CreatePostContextProvider";
import { useState, MouseEvent } from "react";
import Input from "./ui/Input";
import TextArea from "./ui/TextArea";

export default function CreatePostForm({ handleCreatePost }: { handleCreatePost: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  const { title, setTitle, description, setDescription } = useCreatePostContext();
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: ''
  });

  const submitForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validateDescription(description);
    validateTitle(title);
    if (!formErrors.title && !formErrors.description) {
      handleCreatePost(e);
    }
  }

  const validateTitle = (title: string) => {
    setTitle(title);
    setFormErrors((prevErrors) => {
      if (title.length < 3) {
        return { ...prevErrors, title: 'Title must be at least 3 characters long' };
      } else if (title.length > 150) {
        return { ...prevErrors, title: 'Title must be at most 150 characters long' };
      } else {
        return { ...prevErrors, title: '' };
      }
    });
  }

  const validateDescription = (description: string) => {
    setDescription(description);
    setFormErrors((prevErrors) => {
      if (description.length < 7) {
        return { ...prevErrors, description: 'Description must be at least 7 characters long' };
      } else if (description.length > 250) {
        return { ...prevErrors, description: 'Description must be at most 250 characters long' };
      } else {
        return { ...prevErrors, description: '' };
      }
    });
  }

  return (
    <form className="w-[20vw] max-h-[60vh] h-max bg-nord-0 rounded-xl p-4 flex flex-col gap-4">
      <Heading variant="3" className="text-nord-14">Post details</Heading>
      <Input label="Title" type="text" id="title" value={title} onChange={(e) => validateTitle(e.target.value)} error={formErrors.title} />
      <TextArea label="Description" id="description" value={description} onChange={(e) => validateDescription(e.target.value)} error={formErrors.description} />
      <Button
        variant="primary-2"
        onClick={submitForm}
      >
        Create post
      </Button>
    </form>
  );
}
