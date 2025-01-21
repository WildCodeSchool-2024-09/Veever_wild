import "./Chr-Bottom-Card.css";
export default function ChrBottomCard() {
  return (
    <>
      <section className="chr-bottom-section">
        <h1>Standing milieu de gamme</h1>
        <select name="type" className="type-select">
          <option value="">Type:</option>
          <option value="hotel"> Hôtel</option>
        </select>
        <h2>Equipements</h2>
        <ul>
          <li>Bar à thème</li>
          <li>Wifi gratuit</li>
          <li>Service de chambre </li>
        </ul>
      </section>
      <footer className="button-container">
        <button type="button" className="add-button">
          Ajouter
        </button>
      </footer>
    </>
  );
}
