import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import ChrMiddleCard from "../Catalog/Catalog-Cards/Chr-Middle-Card";

export default function CatalogSwipper() {
  const { saveCards } = useSaveCards();
  return (
    <section>
      <ChrMiddleCard saveCards={saveCards} />
    </section>
  );
}
