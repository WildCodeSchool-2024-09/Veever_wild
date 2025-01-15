import { useEffect, useState } from "react";
import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import TestSwiper from "../TestSwiper/TestSwiper";
import "./swiper.css";
type Card = {
  id: number;
  picture: string;
  name: string;
  maxPrice: number;
  address: string;
};
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
