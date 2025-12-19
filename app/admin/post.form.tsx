"use client";
import { useState } from "react";

export default function EditPostForm({ path }: { path: string | null }) {
  const [newPath, setNewPath] = useState<string>(path || "");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [blurb, setBlurb] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string>("");
  return (
    <form className="">

    </form>
  );
}