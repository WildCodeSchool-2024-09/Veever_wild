import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputLastName() {
  return (
    <>
      <fieldset className="formGroup">
        <label htmlFor="lastname">Votre nom</label>
        <StyledInput
          required
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Votre nom"
        />
      </fieldset>
    </>
  );
}
