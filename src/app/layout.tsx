import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import { ToggleProvider } from "@/lib/toggle-context";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-loaded",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-sans-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Future productions — Operabase",
  description:
    "Operabase /productions redesign — a Monsoonfish design exercise by Vishal Maurya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <ToggleProvider>{children}</ToggleProvider>
      </body>
    </html>
  );
}
