import { useEffect, useState } from "react";
import type { ChrCardProps } from "../../types/Catalog/CatalogTypes";
import Cardz from "../Swiper/SwiperCard";
import "./questionnaire.css";
import SwiperHeader from "../Swiper/Swiperheader";

export default function Questionnaire() {
  const [cards, setCards] = useState<ChrCardProps[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/keywords")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);
  return (
    <>
      <SwiperHeader />
      <article className="card-map">
        {cards.map((card) => (
          <Cardz
            handleKeywordSelection={() => {}}
            key={card.id}
            {...card}
            cards={cards}
            setCards={setCards}
            picture={card.link}
          />
        ))}
      </article>
    </>
  );
}
