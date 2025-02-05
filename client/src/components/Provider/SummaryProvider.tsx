import PriceDisplay from "../../services/Provider/PriceDisplay";
import TypeDisplay from "../../services/Provider/TypeDisplay";
import type { Chr } from "../../types/Provider/ProviderType";

export default function SummaryProvider({ chr }: { chr: Chr }) {
  return (
    <ul className="summary">
      <li>
        <TypeDisplay type={chr.type} />
      </li>
      <li>{chr.address}</li>
      {chr.type === "activity" ? (
        <li>
          {+chr.additional_info / 60}
          {+chr.additional_info / 60 > 1 ? " heures" : " heure"}
        </li>
      ) : (
        <li>{chr.additional_info}</li>
      )}
      <li>
        <PriceDisplay price={+chr.average_budget} />
      </li>
    </ul>
  );
}
