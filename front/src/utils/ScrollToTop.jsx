import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll en haut à chaque changement de route
    window.scrollTo({ top: 0, behavior: "smooth" });
}, [pathname]);

  return null;
};

export default ScrollToTop;
