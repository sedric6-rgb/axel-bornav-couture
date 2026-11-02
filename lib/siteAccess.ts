import crypto from "crypto";

// Transforme le mot de passe en une empreinte stable, pour ne jamais
// stocker le mot de passe lui-même dans le cookie du visiteur.
export function expectedAccessCookie(password: string): string {
  return crypto.createHash("sha256").update(`abc:${password}`).digest("hex");
}
