import type { Card } from "../../types/Catalog/CatalogTypes";
import "./VersusCard.css";

type VersusCardProps = {
  versusCards: Card[];
};

export default function Versus({ versusCards }: VersusCardProps) {
  if (versusCards.length === 0) {
    return <p>Aucune carte sauvegardée.</p>;
  }
  return (
    <main className="versus-container">
      {versusCards.map((card) => (
        <>
          <article key={card.id} className="versus-card">
            <section>
              <aside className="over-text">
                <h2>{card.name}</h2>
                <p>Localisation : {card.address}</p>
              </aside>
              <img
                className="versus-img"
                src={`http://localhost:3310/${card.images[0].link}`}
                alt=""
              />
            </section>
            <div key={card.id} className="figure-chr-middle-card">
              <p>Prix : {card.average_budget}€</p>
            </div>
            <button className="versus-button" type="button">
              Je valide
            </button>
          </article>
          <p key={card.id}>VS</p>
        </>
      ))}
    </main>
  );
}
