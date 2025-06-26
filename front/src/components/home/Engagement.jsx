// src/components/Engagement.jsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, Smile, Wallet } from "lucide-react";

const engagements = [
  {
    icon: <ShieldCheck size={32} className="text-[#FD4D01]" />,
    title: "Fiabilité",
    description: "Offrir des produits et services de confiance, testés et approuvés.",
  },
  {
    icon: <Lightbulb size={32} className="text-[#FD4D01]" />,
    title: "Innovation",
    description: "Améliorer constamment nos solutions avec les nouvelles technologies.",
  },
  {
    icon: <Smile size={32} className="text-[#FD4D01]" />,
    title: "Satisfaction client",
    description: "Placer le client au cœur de notre stratégie avec un service irréprochable.",
  },
  {
    icon: <Wallet size={32} className="text-[#FD4D01]" />,
    title: "Accessibilité",
    description: "Proposer des tarifs compétitifs et des services pour tous.",
  },
];

const Engagement = () => {
  return (
    <section className="bg-[#F4F8F8] py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-[#034C52] mb-8"
        >
          Nos Engagements
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {engagements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#034C52] mb-2">{item.title}</h3>
              <p className="text-[#4A4A4A] text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Engagement;
