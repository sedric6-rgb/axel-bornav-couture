import type { Metadata } from "next";
import { AccesForm } from "./AccesForm";

export const metadata: Metadata = {
  title: "Accès au site",
  robots: { index: false, follow: false },
};

export default function AccesPage() {
  return <AccesForm />;
}
