import "./Catalog-Boxes.css";
import type { CatalogBoxesProps } from "../../types/Catalog/CatalogTypes";

export default function CatalogBoxes({
  filters,
  onFilterChange,
}: CatalogBoxesProps) {
  return (
    <section>
      <h1 className="catalog-title">Mon catalogue personnalisé</h1>
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
