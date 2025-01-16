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
  type,
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

  return (
    <div className="swiper-container" id={`swiper-${id}`}>
      <article
        className={`swiper-card ${
          cards[0].type === "activities"
            ? "swiper-card-activities"
            : cards[0].type === "hotels"
              ? "swiper-card-hotel"
              : "swiper-card-restaurant"
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
                  stroke="black"
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
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
            >
              <title>LikeIcone</title>
              <path
                d="M5.06 1.92c-2.05 0-3.71 1.66-3.71 3.71 0 4.17 4.2 5.27 7.06 9.4 2.7-4.09 7.05-5.33 7.05-9.4 0-2.05-1.66-3.71-3.71-3.71-1.48 0-2.75.88-3.34 2.14-.59-1.26-1.86-2.14-3.34-2.14z"
                fill="#f26497"
                stroke="black"
                strokeWidth="0.1"
              />
            </svg>
          </button>
        </div>
        {isInfoOpen && (
          <div
            className={`info ${isInfoOpen ? "info-open" : "info-closed"}`}
            id={`info-${id}`}
          >
            <p>Catégories: {category}</p>
            <p>Type: {type}</p>
            <p>
              Nom de l'{type}: {name}
            </p>
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
