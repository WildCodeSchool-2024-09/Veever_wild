import InputEmail from "../FormCreateAcc/inputForm/InputEmail";
import "./NewsLetter.css";

export default function NewsLetter() {
  return (
    <article className="newsLetter-container">
      <h2>Rejoignez l'aventure!</h2>
      <h3>Recevez en avant-première nos meilleurs offres</h3>
      <p className="offerNewsLetter">Offre Exclusive !</p>
      <p className="offerNewsLetter">Accès anticipé au nouveauté !</p>
      <p className="offerNewsLetter">-10% sur votre première réservation !</p>
      <form>
        <label htmlFor="newsLetterEmail">Votre adresse email :</label>
        <InputEmail />
        <button className="newsLetter-btn" type="submit">
          Rejoins l'aventure Veever !
        </button>
      </form>
    </article>
  );
}
