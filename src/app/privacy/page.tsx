import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p className="label-caps text-accent-bright">[CONTENT PENDING]</p>
      <p className="body">
        This page will hold the Parisi Speed School Horsham privacy policy
        required to publish the Meta Instant Form.
      </p>
    </LegalShell>
  );
}
