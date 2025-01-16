import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";
import type { Card } from "../../types/Catalog/CatalogTypes";
type CardProps = {
  id: number;
  name: string;
  type: string;
  maxPrice: number;
  minPrice: number;
  address: string;
  picture: string;
  category: string;
  cards: Card[];
  setCards: (cards: Card[]) => void;
};
export default function Cardz({
  id,
  picture,
  name,
  maxPrice,
  minPrice,
  address,
  category,
  cards,
  setCards,
}: CardProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [, setIsAnimated] = useState(false);
  const { addCard } = useSaveCards();

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX > 50) {
      const swippedCards = cards.find((card) => card.id === id);
      if (swippedCards) {
        addCard(swippedCards);
      }
      setCards(cards.filter((card) => card.id !== id));
    } else if (currentX < -50) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const scrollToInfo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleClickInfo = () => {
    setIsInfoOpen((prev) => !prev);
    setTimeout(() => {
      scrollToInfo(`info-${id}`);
    }, 100);
    if (isInfoOpen) {
      scrollToInfo(`swiper-${id}`);
    }
  };

  const handleLike = () => {
    setIsAnimated(true);

    animate(x, 150, {
      duration: 0.5,
      onComplete: () => {
        const swippedCards = cards.find((card) => card.id === id);
        if (swippedCards) {
          addCard(swippedCards);
        }
        setCards(cards.filter((card) => card.id !== id));
        setIsAnimated(false);
      },
    });
  };

  const handleDislike = () => {
    setIsAnimated(true);
    animate(x, -150, {
      duration: 0.5,
      onComplete: () => {
        setCards(cards.filter((card) => card.id !== id));
        setIsAnimated(false);
      },
    });
  };

  const currentIndex = cards.findIndex((card) => card.id === id);

  return (
    <div className="swiper-container" id={`swiper-${id}`}>
      <article
        className={`swiper-card ${
          cards[currentIndex].type === "activities"
            ? "swiper-card-activities"
            : cards[currentIndex].type === "hotels"
              ? "swiper-card-hotel"
              : cards[currentIndex].type === "restaurants"
                ? "swiper-card-restaurant"
                : ""
        }`}
      >
        <motion.img
          className="img-swiper"
          src={picture}
          alt={name}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, opacity, rotate }}
          onDragEnd={handleDragEnd}
        />
        <div className="button-container">
          <button className="swiper-btn" onClick={handleDislike} type="button">
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
            >
              <g transform="translate(-52.11 -582.91)">
                <title>dislikeIcone</title>
                <path
                  d="m64.792 582.91-4.6811 4.6811-4.6811-4.6811-3.3189 3.3189 4.6811 4.6811-4.6811 4.6811 3.3189 3.3189 4.6811-4.6811 4.6811 4.6811 3.3189-3.3189-4.6811-4.6811 4.6811-4.6811-3.3189-3.3189z"
                  fill="#ef3416"
                  stroke="#242124"
                  strokeWidth="0.3"
                />
              </g>
            </svg>
          </button>
          <button
            className="swiper-btn"
            onClick={handleClickInfo}
            type="button"
          >
            + d'infos
          </button>
          <button className="swiper-btn" onClick={handleLike} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="85"
              id="heart"
              viewBox="0 0 16 16"
            >
              <title>Coeur</title>
              <path
                fill="#ef3416"
                stroke="#242124"
                strokeWidth="0.3"
                d="M5.301 3.002c-.889-.047-1.759.247-2.404.893-1.29 1.292-1.175 3.49.26 4.926l.515.515L8.332 14l4.659-4.664.515-.515c1.435-1.437 1.55-3.634.26-4.926-1.29-1.292-3.483-1.175-4.918.262l-.516.517-.517-.517C7.098 3.438 6.19 3.049 5.3 3.002z"
              >
                Coeur
              </path>
            </svg>
          </button>
        </div>
        {isInfoOpen && (
          <div
            className={`info ${isInfoOpen ? "info-open" : "info-closed"}`}
            id={`info-${id}`}
          >
            <p>Catégories: {category}</p>
            <p>{name}</p>
            <p>Adresse: {address}</p>
            <p>
              Prix entre {minPrice} et {maxPrice}€
            </p>
          </div>
        )}
      </article>
    </div>
  );
}
