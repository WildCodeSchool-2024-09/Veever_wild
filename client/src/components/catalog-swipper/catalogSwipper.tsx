import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import type { Card } from "../../types/Catalog/CatalogTypes";
import ChrMiddleCard from "../Catalog-Cards/Chr-Middle-Card";
export type CatalogueProps = {
  saveCards: Card[];
};

export default function CatalogSwipper() {
  const { saveCards } = useSaveCards();
  return (
    <section>
      <ChrMiddleCard saveCards={saveCards} />
    </section>
  );
}
