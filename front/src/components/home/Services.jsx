import React from "react";
import { MonitorSmartphone, Megaphone, Printer } from "lucide-react"; // Icônes modernes

const services = [
  {
    title: "Développement de Solutions",
    description:
      "Applications web et systèmes numériques sur-mesure pour entreprises et institutions, alliant performance et sécurité.",
    icon: <MonitorSmartphone size={40} className="text-[#FD4D01]" />,
  },
  {
    title: "Communication Visuelle",
    description:
      "Création de flyers, affiches, logos, contenus pour réseaux sociaux et branding d’entreprise pour valoriser votre image.",
    icon: <Megaphone size={40} className="text-[#FD4D01]" />,
  },
  {
    title: "Matériel Informatique",
    description:
      "Ordinateurs, imprimantes, consommables et accessoires numériques de qualité, avec service après-vente inclus.",
    icon: <Printer size={40} className="text-[#FD4D01]" />,
  },
];


const Services = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-[#034C52] text-center">
          Nos Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#F4F8F8] rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-[#034C52] mb-2">
                {service.title}
              </h3>
              <p className="text-[#4A4A4A] text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
