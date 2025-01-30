import { useEffect, useState } from "react";
import type { ChrCardProps } from "../../types/Catalog/CatalogTypes";
import Cardz from "../Swiper/SwiperCard";
import SwiperHeader from "../Swiper/Swiperheader";

export default function Questionnaire() {
  const [cards, setCards] = useState<ChrCardProps[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/keywords`)
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
