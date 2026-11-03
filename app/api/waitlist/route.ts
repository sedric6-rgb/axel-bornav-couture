import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import os from "os";
import path from "path";
import type { WaitlistEntry } from "@/lib/types";
import { addContactToBrevo } from "@/lib/brevo";

// Repli local : utilisé uniquement si Brevo n'est pas encore configuré
// (BREVO_API_KEY / BREVO_LIST_ID absents), pour ne jamais perdre une
// inscription pendant le développement. On écrit dans le dossier temporaire
// du système : c'est le seul endroit accessible en écriture une fois le
// site déployé sur Vercel (le reste du projet est en lecture seule).
const FILE = path.join(os.tmpdir(), "abc-waitlist.local.json");

function appendLocal(entry: WaitlistEntry) {
  let all: WaitlistEntry[] = [];
  try {
    all = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    all = [];
  }
  if (!all.some((e) => e.email === entry.email)) {
    all.push(entry);
    fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
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

  try {
    await addContactToBrevo({
      email: entry.email,
      firstName: entry.firstName,
      country: entry.country,
      interest: entry.interest,
    });
  } catch (err) {
    // Brevo pas encore configuré (ou indisponible) : on garde quand même
    // l'inscription localement pour ne rien perdre, et on prévient dans les
    // journaux du serveur pour que ce soit visible en test.
    console.warn("[waitlist] Brevo indisponible, repli local :", (err as Error).message);
    try {
      appendLocal(entry);
    } catch {
      return NextResponse.json({ error: "Erreur d'enregistrement." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
