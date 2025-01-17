import useFormValidation from "../../services/Form/FormValidation";
import InputEmail from "../FormCreateAcc/inputForm/InputEmail";
import "./NewsLetter.css";

export default function NewsLetter() {
  const { email, handleEmailCheckChange, errors } = useFormValidation();
  return (
    <article className="newsLetter-container">
      <h3>Recevez en avant-première nos meilleurs offres</h3>
      <p className="offerNewsLetter">Offre Exclusive !</p>
      <p className="offerNewsLetter">Accès anticipé au nouveauté !</p>
      <p className="offerNewsLetter">-10% sur votre première réservation !</p>
      <form>
        <div className="email-container">
          <InputEmail
            email={email}
            handleEmailCheckChange={handleEmailCheckChange}
            errors={errors}
          />
        </div>
        <button className="newsLetter-btn" type="submit">
          Rejoins l'aventure Veever !
        </button>
      </form>
    </article>
  );
}
