import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "SMS Terms",
};

export default function SmsTermsPage() {
  return (
    <LegalShell title="SMS Terms">
      <p className="label-caps text-accent-bright">[CONTENT PENDING]</p>
      <p className="body">
        This page will hold the A2P messaging terms for texts from Parisi Speed
        School Horsham.
      </p>
    </LegalShell>
  );
}
