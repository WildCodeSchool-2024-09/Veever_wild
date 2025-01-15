import CatalogBoxes from "../../components/Catalog-Boxes/Catalog-Boxes";
import CatalogCards from "../../components/Catalog-Cards/Catalog-Cards";
import CatalogRecap from "../../components/Catalog-Recap/CatalogRecap";
import useCatalogLogic from "../../services/Catalog/CatalogFilterLogic";

export default function Catalog() {
  const { filters, handleFilterChange, filteredCards, filteredRecapData } =
    useCatalogLogic();

  return (
    <main>
      <CatalogBoxes filters={filters} onFilterChange={handleFilterChange} />
      <CatalogRecap data={filteredRecapData} />
      <CatalogCards saveCards={filteredCards} />
    </main>
  );
}
