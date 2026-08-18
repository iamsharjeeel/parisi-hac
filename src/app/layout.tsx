import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Archivo_Narrow } from "next/font/google";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.parisispeedschoolhorsham.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parisi Speed School Horsham",
    template: "%s | Parisi Speed School Horsham",
  },
  description:
    "Free 60-minute athletic evaluation for ages 5 to 18 at Parisi Speed School Horsham.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoNarrow.variable} h-full`}
    >
      <body className="min-h-full bg-canvas font-copy antialiased">
        <AttributionCapture />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
