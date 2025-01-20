import type { CatalogueProps } from "../../../types/Catalog/CatalogTypes";
import ChrBottomCard from "./Chr-Bottom-Card";
import "./Chr-Middle-Card.css";

export default function ChrMiddleCard({ saveCards }: CatalogueProps) {
  if (saveCards.length === 0) {
    return <p>Aucune carte sauvegardée.</p>;
  }

  return (
    <>
      {saveCards.map((card) => (
        <article
          key={card.id}
          className={`card-container ${
            card.type === "hotels"
              ? "card-container-hotel"
              : "card-container-restaurant"
          } ${card.type === "activities" ? "card-container-activities" : ""}`}
        >
          <img className="img-catalog-card" src={card.picture} alt="hôtel" />
          <article key={card.id} className="article-chr-middle-card">
            <h2>{card.name}</h2>
            <p>{card.maxPrice}</p>
            <p>{card.address}</p>
          </article>
          <ChrBottomCard />
        </article>
      ))}
    </>
  );
}
