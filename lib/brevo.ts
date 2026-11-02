// Connexion à Brevo (ex-Sendinblue), pour stocker les inscriptions
// (liste d'attente + newsletter) dans une vraie liste de contacts,
// utilisable directement pour envoyer des e-mails plus tard.
//
// Nécessite deux variables d'environnement (voir .env.local.example) :
// BREVO_API_KEY et BREVO_LIST_ID.

interface BrevoContactInput {
  email: string;
  firstName?: string;
  country?: string;
  interest?: string;
}

export async function addContactToBrevo(input: BrevoContactInput): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    throw new Error(
      "BREVO_API_KEY ou BREVO_LIST_ID manquant : voir .env.local.example"
    );
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      attributes: {
        FIRSTNAME: input.firstName || undefined,
        COUNTRY: input.country,
        INTEREST: input.interest,
      },
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  // Brevo renvoie 204 à la création, et peut renvoyer certains codes
  // d'erreur "bénins" (ex. contact déjà présent) selon la configuration.
  if (!res.ok && res.status !== 400) {
    const text = await res.text().catch(() => "");
    throw new Error(`Brevo a refusé la requête (${res.status}) : ${text}`);
  }
}
