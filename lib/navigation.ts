export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  columns?: NavColumn[];
  image?: { src: string; alt: string };
}

export const mainNav: NavItem[] = [
  {
    label: "Femme",
    href: "/femme",
    image: { src: "/images/gamme.jpg", alt: "Collection Femme Axel Bornav Couture" },
    columns: [
      {
        heading: "Tongs",
        links: [
          { label: "Cravate", href: "/produit/tongs-cravate" },
          { label: "Nœud papillon", href: "/produit/tongs-noeud-papillon" },
          { label: "Boutons de chemise", href: "/produit/tongs-boutons-de-chemise" },
          { label: "Boucle de ceinture", href: "/produit/tongs-boucle-de-ceinture" },
          { label: "Toutes les tongs", href: "/femme/tongs" },
        ],
      },
      {
        heading: "Talons",
        links: [
          { label: "Escarpins", href: "/femme/talons?famille=escarpins" },
          { label: "Sandales", href: "/femme/talons?famille=sandales" },
          { label: "Tous les talons", href: "/femme/talons" },
        ],
      },
    ],
  },
  {
    label: "Homme",
    href: "/homme",
    image: { src: "/images/homme-richelieu-bicolore.jpg", alt: "Collection Homme Axel Bornav Couture" },
    columns: [
      {
        heading: "Chaussures homme",
        links: [
          { label: "Mocassin Pampilles", href: "/produit/homme-mocassin-pampilles" },
          { label: "Mocassin Classique", href: "/produit/homme-mocassin-classique" },
          { label: "Richelieu Bicolore", href: "/produit/homme-richelieu-bicolore" },
          { label: "Richelieu Uni", href: "/produit/homme-richelieu-uni" },
          { label: "Toutes les chaussures", href: "/homme/chaussures-homme" },
        ],
      },
      {
        heading: "Sneakers",
        links: [{ label: "Découvrir", href: "/homme/sneakers" }],
      },
    ],
  },
  { label: "Coffret et cadeaux", href: "/coffret" },
  { label: "La Maison", href: "/la-maison" },
  { label: "Service client", href: "/service-client" },
];

export const footerColumns: NavColumn[] = [
  {
    heading: "Service client",
    links: [
      { label: "Livraison et douane", href: "/service-client/livraison" },
      { label: "Retours et échanges", href: "/service-client/retours" },
      { label: "Guide des pointures", href: "/service-client/pointures" },
      { label: "Entretien", href: "/service-client/entretien" },
      { label: "FAQ", href: "/service-client/faq" },
      { label: "Contact", href: "/service-client/contact" },
    ],
  },
  {
    heading: "La Maison",
    links: [
      { label: "Notre histoire", href: "/la-maison" },
      { label: "Coffret et cadeaux", href: "/coffret" },
      { label: "Liste d'attente", href: "/liste-attente" },
    ],
  },
  {
    heading: "Informations légales",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Conditions générales de vente", href: "/cgv" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "Cookies", href: "/cookies" },
      { label: "Droit de rétractation", href: "/retractation" },
    ],
  },
];
