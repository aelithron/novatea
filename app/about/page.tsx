import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = { title: "about" }
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faAddressCard} /> about nova</h1>
      <p>an extended bio</p>
      <div className="mt-2">
        <p>hi! my name is nova, and i&apos;m a random software dev on the internet :3</p>
      </div>
    </main>
  );
}