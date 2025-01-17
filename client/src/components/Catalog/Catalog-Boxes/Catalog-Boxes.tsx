import type { CatalogBoxesProps } from "../../../types/Catalog/CatalogTypes";
import "./Catalog-Boxes.css";

export default function CatalogBoxes({
  filters,
  onFilterChange,
}: CatalogBoxesProps) {
  return (
    <section>
      <form className="catalog-boxes-form" action="">
        <label className="catalog-boxes">
          <input
            type="checkbox"
            checked={filters.all}
            onChange={() => onFilterChange("all")}
          />
          Tous
        </label>

        <label className="catalog-boxes">
          <input
            type="checkbox"
            checked={filters.hotels}
            onChange={() => onFilterChange("hotels")}
          />
          Hôtels
        </label>
        <label className="catalog-boxes">
          <input
            type="checkbox"
            checked={filters.restaurants}
            onChange={() => onFilterChange("restaurants")}
          />
          Restaurants
        </label>
        <label className="catalog-boxes">
          <input
            type="checkbox"
            checked={filters.activities}
            onChange={() => onFilterChange("activities")}
          />
          Activités
        </label>
      </form>
    </section>
  );
}
