import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import cn from "classnames";

import { ContextWrapper, Footer, Navigation } from "@/components";

import "@/styles/globals.css";
import styles from "./styles.module.scss";

const font = Roboto({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
  preload: true
});

export const metadata: Metadata = {
  title: "Ed/Wong",
  description: "Ed Wong's website",
  metadataBase: new URL("https://ed-wong.vercel.app/"),
  verification: { google: "BWruRMcykt6z0Whnhp06V06HtSvvmLmVhVKlos-jFjE" }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, styles.body)}>
        <ContextWrapper>
          <Navigation />
          <main className={styles.mainContainer}>{children}</main>
          <Footer />
        </ContextWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
