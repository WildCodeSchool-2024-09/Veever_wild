import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function inputUsername() {
  return (
    <fieldset className="formGroup">
      <label htmlFor="username">Choisissez un nom d'utilisateur</label>
      <StyledInput
        required
        type="text"
        name="username"
        id="username"
        placeholder="Votre nom d'utilisateur"
      />
    </fieldset>
  );
}
