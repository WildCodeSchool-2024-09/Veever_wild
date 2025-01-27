import { useCallback, useEffect, useState } from "react";
import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import type { Card } from "../../types/Catalog/CatalogTypes";

export default function UseVersusLogic() {
  const [versusCards, setVersusCards] = useState<Card[]>([]);
  const { saveCards } = useSaveCards();

  const getBestCards = useCallback(() => {
    if (saveCards && saveCards.length > 0) {
      const filteredCards = saveCards.filter((card) => card.type === "hotels");
      setVersusCards(filteredCards);
    }
  }, [saveCards]);

  useEffect(() => {
    getBestCards();
  }, [getBestCards]);

  return { versusCards, getBestCards };
}
