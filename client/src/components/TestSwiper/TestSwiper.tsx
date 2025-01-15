import "./TestSwiper.css";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

// Types pour les cartes et les props du composant Card
type Card = {
  id: number;
  picture: string;
  name: string;
  maxPrice: number;
  address: string;
};

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

// Composant principal
export default function TestSwiper({
  cards,
  setCards,
  setSaveCards,
}: TestSwiperProps) {
  return (
    <>
      <div className="card-map">
        {cards.map((card) => (
          <Card
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

// Composant Card
const Card = ({ id, picture, cards, setCards, setSaveCards }: CardProps) => {
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
      // Retirer la carte si elle est déplacée au-delà de 50px
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const handleLike = () => {
    const likeCards = cards.find((card) => card.id === id);
    if (likeCards) {
      setSaveCards((prev) => [...prev, likeCards]);
    }
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleDislike = () => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <>
      <motion.img
        className="img-swiper"
        src={picture}
        alt="Placeholder"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, opacity, rotate }}
        onDragEnd={handleDragEnd}
      />
      <div className="btnContainer">
        <button onClick={handleDislike} className="btnLike" type="button">
          <img src="/assets/images/Dislike.svg" alt="" />
        </button>
        <button onClick={handleLike} className="btnLike" type="button">
          <img src="/assets/images/Like.svg" alt="" />
        </button>
      </div>
    </>
  );
};
