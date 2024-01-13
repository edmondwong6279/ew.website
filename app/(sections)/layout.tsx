import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { ContextWrapper, Footer, Navigation } from "@/components";

import "@/styles/variables.css";

const font = Roboto({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
  preload: true
});

export const metadata: Metadata = {
  title: "Ed/Wong",
  description: "Ed Wong's website"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ContextWrapper>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ContextWrapper>
        <Analytics />
      </body>
    </html>
  );
}
