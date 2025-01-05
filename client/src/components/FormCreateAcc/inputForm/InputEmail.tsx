import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";
export default function InputEmail() {
  return (
    <fieldset className="formGroup">
      <label htmlFor="email">Votre adresse e-mail</label>
      <StyledInput
        required
        type="email"
        name="email"
        id="email"
        placeholder="Votre e-mail"
      />
    </fieldset>
  );
}
