import "./Chr-Top-Card.css";
export default function ChrTopCard() {
  return (
    <section className="chr-top-section">
      <h1 className="date-card">Date : 20-11-1994</h1>
      <button className="button-throw-likes-away" type="button">
        Vider les likes de ce jour
      </button>
      <h2 className="card-category">Hôtels</h2>
    </section>
  );
}
