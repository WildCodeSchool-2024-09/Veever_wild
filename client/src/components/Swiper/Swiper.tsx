import { useEffect, useState } from "react";
import "./Swiper.css";
import type { ChrCardProps } from "../../types/Catalog/CatalogTypes";
import Cardz from "./SwiperCard";
import SwiperHeader from "./Swiperheader";

export default function Swiper() {
  const [cards, setCards] = useState<ChrCardProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/chr")
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
          />
        ))}
      </article>
    </>
  );
}
