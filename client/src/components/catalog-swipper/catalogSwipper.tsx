import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import ChrMiddleCard from "../Catalog-Cards/Chr-Middle-Card";

type Card = {
  id: number;
  picture: string;
  name: string;
  maxPrice: number;
  address: string;
};
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
