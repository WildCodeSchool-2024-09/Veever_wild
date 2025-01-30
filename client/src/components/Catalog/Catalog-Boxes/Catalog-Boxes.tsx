import type { CatalogBoxesProps } from "../../../types/Catalog/CatalogTypes";
import "./Catalog-Boxes.css";
import type { CheckboxItem } from "../../../types/Catalog/CatalogTypes";
import { CatalogCheckbox } from "./CatalogCheckbox";
const checkboxItems: CheckboxItem[] = [
  { id: "all", label: "Tous", emoji: "❤️" },
  { id: "hotels", label: "Hôtels", emoji: "🏨" },
  { id: "restaurants", label: "Restaurants", emoji: "🍴" },
  { id: "activities", label: "Activités", emoji: "🏃‍♀️" },
];

export default function CatalogBoxes({
  filters,
  onFilterChange,
  data = [],
}: CatalogBoxesProps) {
  return (
    <section>
      <h1 className="catalog-title">Mon catalogue personnalisé</h1>
      <form className="catalog-boxes-form" action="">
        {checkboxItems.map((item) => (
          <CatalogCheckbox
            key={item.id}
            id={`catalog-${item.id}`}
            label={`${data?.find((d) => d.type === item.id)?.count || 0}`}
            emoji={item.emoji}
            checked={filters[item.id]}
            onChange={() => onFilterChange(item.id)}
          />
        ))}
      </form>
    </section>
  );
}
