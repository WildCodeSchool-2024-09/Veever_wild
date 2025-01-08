import CatalogBoxes from "../../components/Catalog-Boxes/Catalog-Boxes";
import CatalogCards from "../../components/Catalog-Cards/Catalog-Cards";
import CatalogFilter from "../../components/Catalog-Filter/CatalogFilter";

export default function Catalog() {
  return (
    <>
      <CatalogBoxes />
      <CatalogFilter />
      <CatalogCards />
    </>
  );
}
