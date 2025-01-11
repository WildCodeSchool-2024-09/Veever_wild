import "./TestSwiper.css";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { type Dispatch, type SetStateAction, useState } from "react";

// Types pour les cartes et les props du composant Card
type Card = {
  id: number;
  url: string;
};

type CardProps = {
  id: number;
  url: string;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
};

// Données initiales des cartes
const cardData: Card[] = [
  { id: 1, url: "src/assets/images/JapaneseFood.jpg" },
  { id: 2, url: "src/assets/images/FastFood.jpg" },
  { id: 3, url: "src/assets/images/PizzaFood.jpg" },
  { id: 4, url: "src/assets/images/JapaneseFood.jpg" },
];

// Composant principal
export default function TestSwiper() {
  const [cards, setCards] = useState<Card[]>(cardData);

  return (
    <div className="card-map">
      {cards.map((card) => (
        <Card key={card.id} cards={cards} setCards={setCards} {...card} />
      ))}
    </div>
  );
}

// Composant Card
const Card = ({ id, url, cards, setCards }: CardProps) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      // Retirer la carte si elle est déplacée au-delà de 50px
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  return (
    <motion.img
      className="img-swiper"
      src={url}
      alt="Placeholder"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, opacity, rotate }}
      onDragEnd={handleDragEnd}
    />
  );
};
