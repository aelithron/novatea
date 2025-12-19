import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "admin" };
export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faBriefcase} /> admin</h1>
    </div>
  );
}