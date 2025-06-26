import { useState } from "react";
import ServiceIcon from "./ServiceIcon";

const ServiceCard = ({ icon, title, description, details, link }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="bg-white p-6 rounded-xl border border-[#D9E1E2] shadow-sm hover:shadow-md transition duration-200 relative z-10">
        <div className="mb-4 text-3xl text-[#FD4D01]"><ServiceIcon Icon={icon} /></div>
        <h3 className="text-xl font-semibold text-[#034C52] mb-2">{title}</h3>
        <p className="text-[#4A4A4A] text-sm leading-relaxed">{description}</p>

        {details && (
          <button
            onClick={() => setOpen(!open)}
            className="mt-4 text-sm text-[#FD4D01] hover:underline"
          >
            {open ? "Réduire" : "Voir les sous-services"}
          </button>
        )}

        {link && (
          <a
            href={link}
            className="mt-4 inline-block text-sm text-[#FD4D01] hover:underline"
          >
            Voir Sahel Digital Store
          </a>
        )}
      </div>

      {open && details && (
        <div className="absolute top-full left-0 w-full bg-white border border-[#D9E1E2] mt-2 rounded-xl p-4 z-20 shadow-lg">
          <ul className="space-y-3">
            {details.map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h4 className="text-[#034C52] font-semibold text-sm">
                    {item.title}
                  </h4>
                  <p className="text-[#4A4A4A] text-xs">{item.description}</p>
                  <p className="text-[#FD4D01] text-xs font-medium">{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
