import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "home ✧ novatea.dev"
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col md:col-span-2">
          <Image src={"https://avatars.githubusercontent.com/u/187228556?v=4"} width={128} height={128} alt="my profile picture" className="rounded-xl" />
          <div>
            <h1 className="text-3xl font-semibold">hi, i&apos;m nova!</h1>
            <h2 className="text-xl">they/she</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
