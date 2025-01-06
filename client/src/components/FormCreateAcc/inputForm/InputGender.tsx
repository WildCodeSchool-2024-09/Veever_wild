import { FormControl, FormLabel } from "@mui/material";
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
    <FormControl className="formGroup" required>
      <FormLabel htmlFor="gender">Votre genre</FormLabel>
      <StyledSelect
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
          <FormLabel htmlFor="othersGenre">Veuillez spécifiez</FormLabel>
          <StyledInput
            type="text"
            name="othersGenre"
            id="othersGenre"
            placeholder="Veuillez spécifiez.."
          />
        </>
      )}
    </FormControl>
  );
}
