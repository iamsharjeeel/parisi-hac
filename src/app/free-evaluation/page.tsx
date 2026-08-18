import type { Metadata } from "next";
import { FreeEvaluationPage } from "@/components/free-evaluation/FreeEvaluationPage";

export const metadata: Metadata = {
  title: "Free Athletic Evaluation | Parisi Speed School Horsham",
  description:
    "Free 60-minute evaluation for athletes ages 5 to 18 at Parisi Speed School Horsham. Speed, power and movement, measured by a coach.",
  openGraph: {
    title: "Free Athletic Evaluation | Parisi Speed School Horsham",
    description:
      "Free 60-minute evaluation for athletes ages 5 to 18 at Parisi Speed School Horsham.",
    type: "website",
    images: [
      {
        url: "/images/og-evaluation.webp",
        width: 1200,
        height: 630,
        alt: "Parisi Speed School Horsham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Athletic Evaluation | Parisi Speed School Horsham",
    description:
      "Free 60-minute evaluation for athletes ages 5 to 18 at Parisi Speed School Horsham.",
    images: ["/images/og-evaluation.webp"],
  },
};

export default function FreeEvaluationRoute() {
  return <FreeEvaluationPage />;
}
