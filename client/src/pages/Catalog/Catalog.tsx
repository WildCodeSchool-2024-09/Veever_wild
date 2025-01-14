import CatalogBoxes from "../../components/Catalog-Boxes/Catalog-Boxes";
import CatalogCards from "../../components/Catalog-Cards/Catalog-Cards";
import CatalogRecap from "../../components/Catalog-Recap/CatalogRecap";
import useCatalogFilter from "../../services/Catalog/CatalogBoxesLogic";
import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import type { RecapItem } from "../../types/Catalog/CatalogTypes";

export default function Catalog() {
  const { filters, handleFilterChange } = useCatalogFilter();
  const { saveCards } = useSaveCards();
  const recapData: RecapItem[] = [
    { name: "Offres likées", emoji: "❤️", count: 23, type: "all" },
    { name: "Hôtels", emoji: "🏨", count: 10, type: "hotels" },
    { name: "Restaurants", emoji: "🍴", count: 8, type: "restaurants" },
    { name: "Activités", emoji: "🏃‍♀️", count: 5, type: "activities" },
  ];

  const filteredData = recapData.filter((item) => filters[item.type]);

  return (
    <main>
      <CatalogBoxes filters={filters} onFilterChange={handleFilterChange} />
      <CatalogRecap data={filteredData} />
      <CatalogCards saveCards={saveCards} />
    </main>
  );
}
