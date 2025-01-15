import { useEffect, useState } from "react";
import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import type { Card } from "../../types/Catalog/CatalogTypes";
import TestSwiper from "../TestSwiper/TestSwiper";
export default function Swiper() {
  const [cards, setCards] = useState<Card[]>([]);
  const { saveCards, setSaveCards } = useSaveCards();
  useEffect(() => {
    fetch("http://localhost:3310/api/chr")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);
  return (
    <div className="swiper-container">
      <TestSwiper
        cards={cards}
        setCards={setCards}
        saveCards={saveCards}
        setSaveCards={setSaveCards}
      />
    </div>
  );
}
