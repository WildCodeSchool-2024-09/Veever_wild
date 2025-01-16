import "./Swiper.css";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import type { Card } from "../../types/Catalog/CatalogTypes";

type CardProps = {
  id: number;
  picture: string;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  setSaveCards: Dispatch<SetStateAction<Card[]>>;
};

type TestSwiperProps = {
  cards: Card[];
  saveCards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  setSaveCards: Dispatch<SetStateAction<Card[]>>;
};

export default function TestSwiper({
  cards,
  setCards,
  setSaveCards,
}: TestSwiperProps) {
  return (
    <>
      <div className="card-map">
        {cards.map((card) => (
          <Cardz
            key={card.id}
            cards={cards}
            setCards={setCards}
            setSaveCards={setSaveCards}
            {...card}
          />
        ))}
      </div>
    </>
  );
}

const Cardz = ({ id, picture, cards, setCards, setSaveCards }: CardProps) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX > 50) {
      const swippedCards = cards.find((card) => card.id === id);
      if (swippedCards) {
        setSaveCards((prev) => [...prev, swippedCards]);
      }
      setCards(cards.filter((card) => card.id !== id));
    } else if (currentX < -50) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  return (
    <motion.img
      className="img-swiper"
      src={picture}
      alt="Placeholder"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, opacity, rotate }}
      onDragEnd={handleDragEnd}
    />
  );
};
