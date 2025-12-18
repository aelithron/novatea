import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = { title: "blog" };
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faNewspaper} /> blog</h1>
      <p>nova&apos;s blog about random things!</p>
    </main>
  );
}