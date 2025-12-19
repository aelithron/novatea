import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: "admin" };
export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <p>Admin</p>
    </div>
  );
}