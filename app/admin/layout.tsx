import { cookies } from "next/headers";
import AuthPrompt from "./adminui.module";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  if (!process.env.ADMIN_TOKEN) return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <p>admin portal wasn&apos;t set up! please add an ADMIN_TOKEN to the environment variables.</p>
    </div>
  );
  if (!store.get("admin_token") || store.get("admin_token")!.value !== process.env.ADMIN_TOKEN) return (
    <div className="flex flex-col min-h-screen p-8 md:p-16">
      <AuthPrompt />
    </div>
  );
  return (<div>{children}</div>);
}