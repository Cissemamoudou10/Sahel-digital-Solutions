import { FaLaptopCode, FaBullhorn, FaStoreAlt } from "react-icons/fa";

export const services = [
  {
    title: "Développement de Solutions",
    description:
      "Applications web et systèmes numériques pour entreprises et institutions.",
    icon: FaLaptopCode ,
    details: [
      {
        icon: "🌐",
        title: "Application web",
        description: "Développement d'application web moderne et responsive.",
        price: "À partir de 300 000 FCFA",
      },
      {
        icon: "📱",
        title: "Application mobile",
        description: "Application Android/iOS pour entreprises et services.",
        price: "À partir de 400 000 FCFA",
      },
      {
        icon: "📊",
        title: "ERP sur mesure",
        description: "Solution complète de gestion interne pour PME/PMI.",
        price: "Sur devis",
      },
      {
        icon: "🛒",
        title: "Site e-commerce",
        description:
          "Site marchand avec gestion de produits, commandes et paiements.",
        price: "À partir de 350 000 FCFA",
      },
    ],
  },
  {
    title: "Communication Visuelle",
    description:
      "Flyers, affiches, logos, réseaux sociaux et branding d’entreprise.",
    icon: FaBullhorn ,
    details: [
      {
        icon: "🖌️",
        title: "Création de logo",
        description: "Logo professionnel et déclinaisons web & print.",
        price: "25 000 FCFA",
      },
      {
        icon: "📄",
        title: "Flyers & affiches",
        description: "Design de supports promotionnels (A5, A4, etc.).",
        price: "À partir de 10 000 FCFA",
      },
      {
        icon: "🎬",
        title: "Montage vidéo",
        description: "Montage de vidéos d’entreprise, événementiel, etc.",
        price: "À partir de 30 000 FCFA",
      },
      {
        icon: "⚙️",
        title: "Motion design",
        description: "Animations graphiques pour présentation et publicité.",
        price: "À partir de 50 000 FCFA",
      },
    ],
  },
  {
    title: "Vente de Matériel",
    description:
      "Matériel informatique, imprimantes, consommables, accessoires numériques.",
    icon: FaStoreAlt ,
    link: "/store",
  },
];
