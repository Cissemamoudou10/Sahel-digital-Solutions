import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ImageIcon, Palette, Type } from "lucide-react";

const services = [
  { icon: <ImageIcon />, label: "Création de flyers" },
  { icon: <Palette />, label: "Logos & Identité visuelle" },
  { icon: <Type />, label: "Cartes de visite" },
  { icon: <BadgeCheck />, label: "Badges professionnels" },
];

const VisualServices = () => (
  <section className="py-16 px-6 bg-[#F5F4F0]">
    <motion.h3
      className="text-3xl font-semibold text-center text-[#034C52] mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      Nos Services
    </motion.h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center mb-4 text-[#FD4D01]">{service.icon}</div>
          <h4 className="text-[#034C52] font-semibold">{service.label}</h4>
        </motion.div>
      ))}
    </div>
  </section>
);

export default VisualServices;
