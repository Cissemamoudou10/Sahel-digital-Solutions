import React from "react";
import VisualIntro from "../components/sahelVisual/VisualIntro";
import VisualGallery from "../components/sahelVisual/VisualGallery";
import CallToAction from "../components/home/CallToAction";

const SahelVisual = () => {
  return (
    <main className="pt-[taille-navbar]">
      {" "}
      {/* adapte pt-[taille-navbar] à la hauteur réelle de ta navbar */}
      <VisualIntro />
      <VisualGallery />
      <CallToAction />
    </main>
  );
};

export default SahelVisual;
