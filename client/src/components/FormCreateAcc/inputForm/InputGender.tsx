import { useState } from "react";
import {
  StyledInput,
  StyledSelect,
} from "../../../services/FormCreateAcc/inputStyle";

export default function InputGender() {
  const [gender, setGender] = useState("");
  const handleChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  return (
    <fieldset className="formGroup">
      <label htmlFor="gender">Votre genre</label>
      <StyledSelect
        required
        name="gender"
        id="gender"
        value={gender}
        onChange={handleChangeGender}
      >
        <option value="">Veuillez sélectionner</option>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="others">Autres</option>
      </StyledSelect>

      {gender === "others" && (
        <>
          <label htmlFor="othersGenre">Veuillez spécifiez</label>
          <StyledInput
            type="text"
            name="othersGenre"
            id="othersGenre"
            placeholder="Veuillez spécifiez.."
          />
        </>
      )}
    </fieldset>
  );
}
