import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s ✧ novatea.dev",
    default: "novatea.dev"
  },
  description: "nova's personal website and blog :3"
};
const quicksand = Quicksand({ weight: "500" });
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased ${quicksand.className}`}>
        {children}
      </body>
    </html>
  );
}
