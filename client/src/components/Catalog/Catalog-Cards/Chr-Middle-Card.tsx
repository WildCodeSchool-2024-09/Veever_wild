import type { CatalogueProps } from "../../../types/Catalog/CatalogTypes";
import ChrBottomCard from "./Chr-Bottom-Card";
import "./Chr-Middle-Card.css";

export default function ChrMiddleCard({ saveCards }: CatalogueProps) {
  if (saveCards.length === 0) {
    return <p>Aucune carte sauvegardée.</p>;
  }

  console.info(saveCards);
  return (
    <>
      {saveCards.map((card) => (
        <article
          key={card.id}
          className={`card-container  card-container-${card.type}`}
        >
          <img className="img-catalog-card" src={card.images[0].link} alt="" />
          <article key={card.id} className="article-chr-middle-card">
            <h2>{card.name}</h2>
            <p>{card.average_budget}</p>
            <p>{card.address}</p>
          </article>
          <ChrBottomCard />
        </article>
      ))}
    </>
  );
}
