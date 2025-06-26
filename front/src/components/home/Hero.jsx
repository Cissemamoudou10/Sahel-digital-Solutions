import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import { Link } from "react-scroll";
// import { assets } from "../assets/assets"; // Assurez-vous que le logo ou visuel existe

const Hero = () => {
  return (
    <section
      id="Header"
      className="relative bg-cover bg-center bg-no-repeat text-[#1B1B1B] pt-20 pb-16 px-6 md:px-20"
      style={{
        backgroundImage: `url(${assets.banniere_1_SDG})`,
      }}
    >
      <div className="bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-lg flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Sahel Digital Solutions
          </h1>
          <p className="text-[#1b1b1b] text-base md:text-lg mb-6">
            Solutions innovantes en informatique, communication digitale et
            impression de qualité, avec un service client sur-mesure.
          </p>
          <Link
            to="services"
            smooth={true}
            duration={200}
            className="inline-block bg-[#FD4D01] hover:bg-[#e64500] text-white px-6 py-3 rounded-full text-sm font-semibold cursor-pointer"
          >
            Découvrir nos services
          </Link>
        </motion.div>

        {/* Image ou illustration optionnelle */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 hidden md:block"
        >
          <img
            src={assets.banniere_2_SDG}
            alt="Hero illustration"
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
