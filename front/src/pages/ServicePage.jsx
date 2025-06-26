import Header from "../components/service/Header";
import ServicesGrid from "../components/service/ServicesGrid";
import Realisations from "../components/service/Realisations"


export default function ServicesPage() {
  return (
    <section className="w-full bg-[#F4F8F8] py-20 px-6 md:px-20 text-[#1B1B1B]">
      <div className="max-w-7xl mx-auto">
        <Header />
        <ServicesGrid />
        <Realisations />
      </div>
    </section>
  );
}
