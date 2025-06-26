// src/components/CallToAction.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const CallToAction = () => {
  return (
    <section className="bg-[#034C52] text-white py-20 px-4 sm:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-4"
        >
          Prêt à booster votre présence digitale ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#D9E1E2] mb-8"
        >
          Contactez-nous dès aujourd’hui pour transformer vos idées en solutions concrètes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="contact"
            smooth={true}
            duration={200}
            offset={-70}
            className="bg-[#FD4D01] hover:bg-[#e54701] text-white px-6 py-3 rounded-full font-semibold cursor-pointer transition"
          >
            Contactez-nous
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
