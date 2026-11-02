import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";

export const metadata: Metadata = { title: "Guide des pointures" };

const sizes = [
  { eu: 35, us: "5" },
  { eu: 36, us: "6" },
  { eu: 37, us: "6.5" },
  { eu: 38, us: "7.5" },
  { eu: 39, us: "8" },
  { eu: 40, us: "9" },
  { eu: 41, us: "9.5" },
  { eu: 42, us: "10" },
  { eu: 43, us: "11" },
  { eu: 44, us: "11.5" },
  { eu: 45, us: "12.5" },
  { eu: 46, us: "13" },
];

export default function PointuresPage() {
  return (
    <TextPage eyebrow="Service client" title="Guide des pointures">
      <p>
        Nos modèles sont disponibles en pointures européennes 35 à 46.
        Tableau de conversion indicatif ci-dessous.
      </p>

      <table className="w-full text-sm mt-6 border-collapse">
        <thead>
          <tr className="border-b border-brown/20 text-xs tracking-label text-muted">
            <th className="text-left py-2">Pointure EU</th>
            <th className="text-left py-2">Pointure US</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((s) => (
            <tr key={s.eu} className="border-b border-brown/10">
              <td className="py-2 text-ink">{s.eu}</td>
              <td className="py-2 text-ink">{s.us}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-8">
        En cas de doute entre deux pointures, nous conseillons de prendre la
        pointure supérieure. Pour toute question, notre{" "}
        <a href="/service-client/contact">service client</a> reste à votre
        disposition.
      </p>
    </TextPage>
  );
}
