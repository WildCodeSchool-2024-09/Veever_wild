import "./Chr-Middle-Card.css";
export default function ChrMiddleCard() {
  return (
    <section>
      <img
        className="img-catalog-card"
        src="src\assets\images\AppartHotel.jpg"
        alt="hôtel"
      />
      <article className="article-chr-middle-card">
        <h2>Nom de l'hôtel</h2>
        <p>Prix de l'hôtel</p>
        <p>Adresse de l'hôtel</p>
      </article>
    </section>
  );
}
