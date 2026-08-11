import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    "Athletic performance training for youth athletes at Parisi Speed School Horsham.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${kanit.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <AttributionCapture />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
