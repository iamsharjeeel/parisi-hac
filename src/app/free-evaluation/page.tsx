import type { Metadata } from "next";
import { FreeEvaluationPage } from "@/components/free-evaluation/FreeEvaluationPage";

export const metadata: Metadata = {
  title: "Free Athletic Performance Evaluation | Parisi Speed School Horsham",
  description:
    "Book a free 60-minute athletic performance evaluation for athletes ages 5–18 at Parisi Speed School Horsham. Assess speed, power, mobility and movement.",
  openGraph: {
    title: "Free Athletic Performance Evaluation | Parisi Speed School Horsham",
    description:
      "Book a free 60-minute athletic performance evaluation for athletes ages 5–18 at Parisi Speed School Horsham. Assess speed, power, mobility and movement.",
    type: "website",
    images: [
      {
        url: "/images/og-evaluation.webp",
        width: 1200,
        height: 630,
        alt: "Parisi Speed School Horsham athletic performance training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Athletic Performance Evaluation | Parisi Speed School Horsham",
    description:
      "Book a free 60-minute athletic performance evaluation for athletes ages 5–18 at Parisi Speed School Horsham.",
    images: ["/images/og-evaluation.webp"],
  },
};

export default function FreeEvaluationRoute() {
  return <FreeEvaluationPage />;
}
