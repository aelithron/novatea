import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { CreatePostForm } from "../post.form";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "create post" };
export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen p-4 py-8 md:p-8">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faPlus} /> create post</h1>
      <CreatePostForm />
    </div>
  );
}