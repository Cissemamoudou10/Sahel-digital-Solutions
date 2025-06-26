import ServiceCard from "./ServiceCard";
import { services } from "../../utils/services";


const ServicesGrid = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((s, i) => (
        <ServiceCard key={i} {...s} />
      ))}
    </div>
  );
};
export default ServicesGrid;


