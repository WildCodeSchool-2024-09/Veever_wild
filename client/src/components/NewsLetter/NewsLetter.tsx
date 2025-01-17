import useFormValidation from "../../services/Form/FormValidation";
import InputEmail from "../FormCreateAcc/inputForm/InputEmail";
import "./NewsLetter.css";

export default function NewsLetter() {
  const { email, handleEmailCheckChange, errors } = useFormValidation();
  return (
    <article className="newsLetter-container">
      <h2>Rejoignez l'aventure!</h2>
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
