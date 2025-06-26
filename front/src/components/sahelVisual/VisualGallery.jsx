import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Conception de Flyers Impactants",
    description:
      "Des flyers percutants conçus pour capter l'attention dès le premier regard.",
    image:
      "https://images.unsplash.com/photo-1733506260573-2ddbf1db9b1a?q=80&w=2096&auto=format&fit=crop",
  },
  {
    title: "Identité Visuelle et Logos",
    description:
      "Des logos professionnels qui racontent l’histoire de votre marque.",
    image:
      "https://images.unsplash.com/photo-1747763644394-223fea77520f?q=80&w=1948&auto=format&fit=crop",
  },
  {
    title: "Affiches Événementielles",
    description:
      "Des affiches créatives pour valoriser vos événements avec style.",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Conception de Flyers Impactants",
    description:
      "Des flyers percutants conçus pour capter l'attention dès le premier regard.",
    image:
      "https://images.unsplash.com/photo-1733506260573-2ddbf1db9b1a?q=80&w=2096&auto=format&fit=crop",
  },
  {
    title: "Identité Visuelle et Logos",
    description:
      "Des logos professionnels qui racontent l’histoire de votre marque.",
    image:
      "https://images.unsplash.com/photo-1747763644394-223fea77520f?q=80&w=1948&auto=format&fit=crop",
  },
  {
    title: "Affiches Événementielles",
    description:
      "Des affiches créatives pour valoriser vos événements avec style.",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  },
];

export default function VisualGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Navigation clavier (flèches + échap)
  useEffect(() => {
    function handleKeyDown(e) {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => (i - 1 + projects.length) % projects.length);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Variants pour le modal (animation d'ouverture/fermeture)
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.9 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <section className="py-24 bg-[#F4F8F8]">
      <motion.div
        className="text-center max-w-3xl mx-auto px-4 mb-16"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewport={{ once: true }}
        // on peut animer aussi les enfants avec staggerChildren
        // mais ici on gère via delay sur chaque enfant
      >
        <motion.h2
          className="text-4xl font-bold text-[#034C52] mb-4 leading-snug"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
        >
          Chaque visuel raconte une{" "}
          <span className="text-[#FD4D01]">histoire</span>
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.3, ease: "easeOut" }}
        >
          Découvrez nos créations : des designs qui allient esthétique,
          efficacité et émotion.
        </motion.p>
      </motion.div>

      {/* Galerie */}
      <div className="flex space-x-6 overflow-x-auto px-6 scrollbar-hide">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="min-w-[300px] sm:min-w-[380px] bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(253, 77, 1, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-60"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
            />
            <div className="p-5">
              <motion.h3
                className="text-xl font-semibold text-[#034C52]"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ color: "#FD4D01" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="mt-2 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 z-50"
            onClick={() => setLightboxIndex(null)}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="relative max-w-4xl w-full rounded-lg overflow-hidden bg-white"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Image */}
              <motion.img
                src={projects[lightboxIndex].image}
                alt={projects[lightboxIndex].title}
                className="max-h-[80vh] w-full object-contain bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                loading="lazy"
              />
              {/* Texte */}
              <motion.div
                className="p-6 bg-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-[#034C52]">
                  {projects[lightboxIndex].title}
                </h3>
                <p className="mt-2 text-gray-700">
                  {projects[lightboxIndex].description}
                </p>
              </motion.div>

              {/* Flèches navigation */}
              <motion.button
                onClick={() =>
                  setLightboxIndex(
                    (i) => (i - 1 + projects.length) % projects.length
                  )
                }
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-[#FD4D01] hover:text-white transition"
                aria-label="Image précédente"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "#FD4D01",
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
              >
                &#8592;
              </motion.button>
              <motion.button
                onClick={() =>
                  setLightboxIndex((i) => (i + 1) % projects.length)
                }
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-[#FD4D01] hover:text-white transition"
                aria-label="Image suivante"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "#FD4D01",
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
              >
                &#8594;
              </motion.button>

              {/* Bouton fermeture */}
              <motion.button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 text-[#034C52] font-bold bg-white rounded-full p-2 shadow hover:bg-[#FD4D01] hover:text-white transition"
                aria-label="Fermer la lightbox"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "#FD4D01",
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
              >
                &times;
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}