import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import ChrMiddleCard from "../Catalog-Cards/Chr-Middle-Card";

export default function CatalogSwipper() {
  const { saveCards } = useSaveCards();
  return <ChrMiddleCard saveCards={saveCards} />;
}
