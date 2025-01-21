import { useEffect, useState } from "react";
import type { ChrCardProps } from "../../types/Catalog/CatalogTypes";
import Cardz from "../Swiper/SwiperCard";
import "./questionnaire.css";

export default function Questionnaire() {
  const [cards, setCards] = useState<ChrCardProps[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/keywords")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);
  return (
    <article className="questionnaire-container">
      <h1>Que préférez-vous ?</h1>
      {cards.map((card) => (
        <article key={card.id} className="questionnaire-card">
          <Cardz
            cards={cards}
            {...card}
            setCards={setCards}
            picture={card.link}
          />
        </article>
      ))}
    </article>
  );
}
