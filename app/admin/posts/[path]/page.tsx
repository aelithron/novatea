import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "blog post" };
export default async function Page({ params }: { params: Promise<{ path: string }>}) {
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">

    </div>
  );
}