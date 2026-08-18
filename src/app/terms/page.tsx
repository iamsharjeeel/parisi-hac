import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms">
      <p className="label-caps text-accent-bright">[CONTENT PENDING]</p>
      <p className="body">
        This page will hold the Parisi Speed School Horsham terms of use.
      </p>
    </LegalShell>
  );
}
