import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <TextPage eyebrow="Service client" title="Contact">
      <p>
        Notre équipe vous répond sous 48 heures ouvrées, en français comme en
        anglais.
      </p>

      <h2>Service client</h2>
      <p>
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
      </p>

      <h2>Questions générales</h2>
      <p>
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
      </p>
    </TextPage>
  );
}
