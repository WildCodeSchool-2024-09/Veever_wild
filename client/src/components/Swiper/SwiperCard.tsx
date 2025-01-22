import { Snackbar } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ChrCardsProps } from "../../types/Catalog/CatalogTypes";
import useSwiper from "../Hooks/Swiper/useSwiper";

export default function Cardz({
  id,
  picture,
  name,
  cards,
  setCards,
  handleKeywordSelection,
}: ChrCardsProps) {
  const {
    handleDislike,
    handleDragEnd,
    handleLike,
    setIsSnackOpen,
    isSnackOpen,
    currentIndex,
    opacity,
    rotate,
    x,
  } = useSwiper(cards, setCards, id, handleKeywordSelection);
  return (
    <article className="swiper-container" id={`swiper-${id.toString()}`}>
      <article
        className={`swiper-card swiper-card-${cards[currentIndex].type}`}
      >
        {isSnackOpen && (
          <Snackbar
            open={isSnackOpen}
            onClose={() => setIsSnackOpen(false)}
            message={`Votre ${cards[currentIndex].type} à était sauvegardé`}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transitionDuration={1000}
          />
        )}
        <motion.img
          className="img-swiper"
          src={picture}
          alt={name}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, opacity, rotate }}
          onDragEnd={() => handleDragEnd(id)}
        />

        <aside className="button-container">
          <button
            className="swiper-btn"
            onClick={() => handleDislike(id)}
            type="button"
          >
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
            >
              <g transform="translate(-52.11 -582.91)">
                <title>J'aime pas</title>
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
            type="button"
            aria-labelledby={cards[currentIndex].type}
          >
            <Link to="/prestataire">+ d'infos</Link>
          </button>
          <button
            className="swiper-btn"
            onClick={() => handleLike(id)}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="85"
              id="heart"
              viewBox="0 0 16 16"
            >
              <title>Jj'aime</title>
              <path
                fill="#ef3416"
                stroke="#242124"
                strokeWidth="0.3"
                d="M5.301 3.002c-.889-.047-1.759.247-2.404.893-1.29 1.292-1.175 3.49.26 4.926l.515.515L8.332 14l4.659-4.664.515-.515c1.435-1.437 1.55-3.634.26-4.926-1.29-1.292-3.483-1.175-4.918.262l-.516.517-.517-.517C7.098 3.438 6.19 3.049 5.3 3.002z"
              >
                J'aime
              </path>
            </svg>
          </button>
        </aside>
      </article>
    </article>
  );
}
