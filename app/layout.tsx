import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./globals.css";
import { Footer, Header } from "./ui.module";
import Script from "next/script";

config.autoAddCss = false;
const quicksand = Quicksand({ weight: "500" });
export const metadata: Metadata = {
  title: {
    template: "%s ✧ novatea.dev",
    default: "novatea.dev"
  },
  description: "nova's personal website and blog :3",
  keywords: ["nova", "blog", "personal", "website", "novatea", "tech", "coding"],
  authors: [{ name: "Nova" }],
  creator: "Nova",
  publisher: "Nova",
  metadataBase: new URL("https://novatea.dev"),
  openGraph: {
    url: "https://novatea.dev",
    type: "website",
    locale: "en_US"
  },
  category: "technology",
  alternates: {
    types: {
      'application/rss+xml': 'https://novatea.dev/feed',
      'application/atom+xml': 'https://novatea.dev/feed?type=atom',
    }
  }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased ${quicksand.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
      <Script src="https://pagering.gideon.sh/embed.js" defer={true}></Script>
    </html>
  );
}
