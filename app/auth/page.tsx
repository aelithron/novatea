import { Metadata } from "next";
import AuthPrompt from "./auth.form";

export const metadata: Metadata = { title: "admin auth" };
export default async function Page() {
  if (!process.env.ADMIN_TOKEN) return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <p>admin portal isn&apos;t set up! please add an ADMIN_TOKEN to the environment variables.</p>
    </div>
  );
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <AuthPrompt />
    </div>
  );
}