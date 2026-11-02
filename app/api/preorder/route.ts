import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { PreorderRequest } from "@/lib/orderTypes";

// Stockage temporaire en fichier local. À remplacer à l'étape B par
// Stripe Checkout (paiement réel) + un e-mail de confirmation automatique.
const FILE = path.join(process.cwd(), "data", "preorders.local.json");

function readAll(): PreorderRequest[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
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

  const all = readAll();
  all.push(entry);

  try {
    fs.writeFileSync(FILE, JSON.stringify(all, null, 2));
  } catch {
    return NextResponse.json({ error: "Erreur d'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
