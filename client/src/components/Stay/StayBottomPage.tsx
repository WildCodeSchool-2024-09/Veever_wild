import "./StayBottomPage.css";

export default function StayBottomPage() {
  return (
    <main className="stay-container">
      <article className="other-informations">
        <h3>Autres informations</h3>
        <label>
          <input type="checkbox" />
          Accès PMR
        </label>
        <label>
          <input type="checkbox" />
          Kids friendly
        </label>
        <label>
          <input type="checkbox" />
          Animaux acceptés
        </label>

        <h3>Accessibilité</h3>
        <label>
          <input type="checkbox" />
          Véhiculé
        </label>
        <label>
          <input type="checkbox" />
          Transports en commun
        </label>
      </article>

      <button className="next-button" type="button">
        Suivant
      </button>
    </main>
  );
}
