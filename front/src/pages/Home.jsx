import React from "react";
import Hero from "../components/home/Hero";
import Presentation from "../components/home/Presentation";
import Services from "../components/home/Services";
import Engagement from "../components/home/Engagement";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
  return (
    <div className="bg-[#FFFFFF] text-[#1B1B1B]">
      {/* Section 1 : Hero */}
      <section id="hero">
        <Hero />
      </section>

      {/* Section 2 : Présentation de l'entreprise */}
      <section id="presentation" className="py-16 px-4 md:px-12">
        <Presentation />
      </section>

      {/* Section 3 : Nos services */}
      <section id="services" className="py-16 px-4 md:px-12 bg-[#F4F8F8]">
        <Services />
      </section>

      {/* Section 4 : Nos engagements */}
      <section id="engagement" className="py-16 px-4 md:px-12">
        <Engagement />
      </section>

      {/* Section 5 : Appel à l'action */}
      <section id="contact" className="py-16 px-4 md:px-12 bg-[#034C52] text-white">
        <CallToAction />
      </section>
    </div>
  );
};

export default Home;
