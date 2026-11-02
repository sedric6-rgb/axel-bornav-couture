import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { WaitlistEntry } from "@/lib/types";

// Stockage temporaire en fichier local, en attendant le choix définitif
// (Supabase ou service d'e-mailing type Brevo) décrit dans le brief, section 7.
const FILE = path.join(process.cwd(), "data", "waitlist.local.json");

function readAll(): WaitlistEntry[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  const entry: WaitlistEntry = {
    email: body.email.trim().toLowerCase(),
    firstName: typeof body.firstName === "string" ? body.firstName.trim() : "",
    country: typeof body.country === "string" ? body.country : "FR",
    interest: ["femme", "homme", "sneakers", "general"].includes(body.interest)
      ? body.interest
      : "general",
  };

  const all = readAll();
  if (all.some((e) => e.email === entry.email)) {
    return NextResponse.json({ ok: true, alreadyRegistered: true });
  }
  all.push(entry);

  try {
    fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
  } catch {
    return NextResponse.json({ error: "Erreur d'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
