import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputFirstName() {
  return (
    <>
      <fieldset className="formGroup">
        <label htmlFor="firstname">Votre Prénom</label>
        <StyledInput
          required
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Votre prénom"
        />
      </fieldset>
    </>
  );
}
