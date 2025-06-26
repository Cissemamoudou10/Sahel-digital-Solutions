import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import { FaBullseye, FaEye, FaHeart, FaLightbulb, FaHandsHelping } from "react-icons/fa";

const Presentation = () => {
  return (
    <section className="relative bg-[#F4F8F8] py-20 px-6 md:px-24 text-[#1B1B1B] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-16">

        {/* Titre principal */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-2 text-center text-[#034C52]"
        >
          Qui sommes-nous ?
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
        >
          {/* Logo */}
          <div className="flex-shrink-0 rounded-lg shadow-lg bg-white p-6">
            <img
              src={assets.logoSDWhite}
              alt="Logo Sahel Digital"
              className="h-24 w-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Description */}
          <p className="text-[#4A4A4A] max-w-3xl text-center md:text-left text-lg leading-relaxed font-medium">
            <strong className="text-[#034C52]">Sahel Digital Solutions</strong> est une entreprise innovante spécialisée dans la vente de matériel informatique, la communication visuelle et le développement de solutions numériques adaptées aux besoins modernes.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-semibold text-[#FD4D01] flex items-center gap-4">
            <FaBullseye className="text-[#FD4D01] text-3xl" /> Mission
          </h3>
          <p className="text-[#4A4A4A] text-lg leading-relaxed font-medium">
            Offrir des solutions accessibles en informatique, communication et impression, tout en assurant un service client premium incluant un SAV gratuit de 3 mois.
          </p>
          <ul className="list-disc list-inside space-y-3 text-[#4A4A4A] text-lg font-medium">
            <li><strong>Vente informatique :</strong> Produits fiables (PC, imprimantes, clés USB...) avec SAV.</li>
            <li><strong>Communication digitale :</strong> Visuels, vidéos et contenus pour les réseaux sociaux.</li>
            <li><strong>Impression :</strong> Travaux de qualité pour pros et particuliers.</li>
          </ul>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-semibold text-[#034C52] flex items-center gap-4">
            <FaEye className="text-[#034C52] text-3xl" /> Vision
          </h3>
          <p className="text-[#4A4A4A] text-lg leading-relaxed font-medium">
            Être une référence du digital et de l’e-commerce en Afrique de l’Ouest, en combinant accessibilité, qualité et innovation.
          </p>
        </motion.div>

        {/* Valeurs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-semibold text-[#FD4D01] flex items-center gap-4 mb-6">
            <FaHeart className="text-[#FD4D01] text-3xl" /> Valeurs
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#4A4A4A] text-lg font-medium">
            <li className="flex items-center gap-4">
              <FaHandsHelping className="text-[#034C52] text-2xl flex-shrink-0" />
              Fiabilité – Produits et services de confiance
            </li>
            <li className="flex items-center gap-4">
              <FaLightbulb className="text-[#034C52] text-2xl flex-shrink-0" />
              Innovation – Solutions tech modernes
            </li>
            <li className="flex items-center gap-4">
              <FaHeart className="text-[#034C52] text-2xl flex-shrink-0" />
              Satisfaction client – Notre priorité
            </li>
            <li className="flex items-center gap-4">
              <FaBullseye className="text-[#034C52] text-2xl flex-shrink-0" />
              Accessibilité – Tarifs justes pour tous
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Exemple : un léger pattern ou gradient */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FD4D01]/20 to-[#034C52]/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Presentation;
