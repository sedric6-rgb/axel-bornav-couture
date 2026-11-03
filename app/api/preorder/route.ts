import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import os from "os";
import path from "path";
import type { PreorderRequest } from "@/lib/orderTypes";
import { addContactToBrevo } from "@/lib/brevo";

// Repli local, utilisé seulement si Brevo n'est pas configuré ou
// indisponible : écrit dans le dossier temporaire du système, le seul
// accessible en écriture une fois le site déployé sur Vercel.
// À remplacer à l'étape B par Stripe Checkout (paiement réel) + un
// e-mail de confirmation automatique.
const FILE = path.join(os.tmpdir(), "abc-preorders.local.json");

function appendLocal(entry: PreorderRequest) {
  let all: PreorderRequest[] = [];
  try {
    all = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    all = [];
  }
  all.push(entry);
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.email !== "string" ||
    !body.email.includes("@") ||
    !Array.isArray(body.items) ||
    body.items.length === 0
  ) {
    return NextResponse.json({ error: "Demande invalide." }, { status: 400 });
  }

  const entry: PreorderRequest = {
    firstName: String(body.firstName ?? "").trim(),
    lastName: String(body.lastName ?? "").trim(),
    email: body.email.trim().toLowerCase(),
    address: String(body.address ?? "").trim(),
    city: String(body.city ?? "").trim(),
    postalCode: String(body.postalCode ?? "").trim(),
    country: String(body.country ?? "FR"),
    items: body.items,
  };

  const orderSummary = entry.items
    .map(
      (i) =>
        `${i.name}${i.variantLabel ? ` (${i.variantLabel})` : ""} — pointure ${i.sizeEU} x${i.quantity}`
    )
    .join(" | ");

  try {
    await addContactToBrevo({
      email: entry.email,
      firstName: entry.firstName,
      lastName: entry.lastName,
      country: entry.country,
      interest: "precommande",
      orderSummary: `${entry.address}, ${entry.postalCode} ${entry.city} — ${orderSummary}`,
    });
  } catch (err) {
    console.warn("[preorder] Brevo indisponible, repli local :", (err as Error).message);
    try {
      appendLocal(entry);
    } catch {
      return NextResponse.json({ error: "Erreur d'enregistrement." }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
