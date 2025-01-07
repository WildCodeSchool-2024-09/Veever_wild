import "./Catalog-Boxes.css";
import CatalogFilter from "../../services/Catalog/CatalogBoxesLogic";
export default function CatalogBoxes() {
  const { filters, handleFilterChange } = CatalogFilter();

  return (
    <section className="catalog-boxes-section">
      <h1 className="catalog-title">Mon catalogue personnalisé</h1>

      <label className="catalog-boxes">
        <input
          type="checkbox"
          checked={filters.all}
          onChange={() => handleFilterChange("all")}
        />
        Tous
      </label>

      <label className="catalog-boxes">
        <input
          type="checkbox"
          checked={filters.hotels}
          onChange={() => handleFilterChange("hotels")}
        />
        Hôtels
      </label>
      <label className="catalog-boxes">
        <input
          type="checkbox"
          checked={filters.restaurants}
          onChange={() => handleFilterChange("restaurants")}
        />
        Restaurants
      </label>
      <label className="catalog-boxes">
        <input
          type="checkbox"
          checked={filters.activities}
          onChange={() => handleFilterChange("activities")}
        />
        Activités
      </label>
    </section>
  );
}
