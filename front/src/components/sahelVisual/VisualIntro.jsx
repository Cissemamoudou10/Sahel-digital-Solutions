import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Création de flyers impactants pour vos événements",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    description: "Design de logos uniques qui parlent de votre marque",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    description: "Affiches modernes et accrocheuses pour toutes vos campagnes",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    description:
      "Cartes de visite et badges personnalisés pour marquer les esprits",
  },
];

const backgroundImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80";

const VisualIntro = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section
    className="relative w-full min-h-[85vh] flex flex-col md:flex-row items-center justify-between text-left overflow-hidden bg-black px-4 md:px-12"
    aria-label="Présentation des services Sahel Visual"
  >
    <div
      className="absolute top-0 left-0 w-full h-full bg-center bg-cover filter brightness-50 z-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
  
    {/* Texte */}
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative z-20 w-full md:w-1/2 py-16 md:py-24 flex flex-col justify-center"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 whitespace-nowrap">
        <span className="drop-shadow-[0_0_15px_rgba(3,76,82,0.4)]" style={{ textShadow: "0 0 20px #034C52" }}>
          Sahel
        </span>{" "}
        <span className="drop-shadow-[0_0_15px_rgba(253,77,1,0.1)]" style={{ textShadow: "0 0 20px #FD4D01" }}>
          Visual
        </span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#dcdddb] leading-relaxed drop-shadow-md max-w-prose">
        Nous réalisons vos visuels professionnels : <span>flyers, logos, affiches, cartes de visite, badges, menus</span>,
        et plus encore, avec un savoir-faire exceptionnel et une créativité unique.
      </p>
    </motion.div>
  
    {/* Slider */}
    <div className="relative z-20 w-full md:w-1/2 mt-12 md:mt-0 flex flex-col items-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-xl shadow-[#034C52]/25 border border-[#0e41456c]"
        >
          <img
            src={slides[current].image}
            alt={slides[current].description}
            className="w-full h-64 md:h-72 object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 text-white text-base md:text-lg font-medium leading-relaxed tracking-wide drop-shadow-lg rounded-md p-3"
            style={{
              background: "linear-gradient(0deg,rgba(0, 0, 0, 0.75) 0%, rgba(7, 8, 7, 0.44) 34%, rgba(209, 206, 194, 0) 67%)",
              backdropFilter: "blur(4px)",
            }}
          >
            {slides[current].description}
          </motion.p>
        </motion.div>
      </AnimatePresence>
  
      <div className="flex justify-center mt-6 gap-5 mb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-[#32A287] shadow-md scale-110"
                : "bg-[#D9E1E2] hover:bg-[#A0C77B] hover:scale-110"
            }`}
            style={{
              boxShadow: i === current ? "0 0 10px #32A287" : "none",
            }}
          />
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default VisualIntro;
