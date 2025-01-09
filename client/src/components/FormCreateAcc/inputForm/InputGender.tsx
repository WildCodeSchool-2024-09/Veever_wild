import { FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import { StyledSelect } from "../../../services/FormCreateAcc/StyledSelect";

export default function InputGender() {
  const [gender, setGender] = useState("");
  const handleChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="gender">Votre genre</FormLabel>
      <StyledSelect
        required
        name="gender"
        id="gender"
        value={gender}
        onChange={handleChangeGender}
      >
        <option value="">Veuillez sélectionner</option>
        <option id="male" value="male">
          Homme
        </option>
        <option id="female" value="female">
          Femme
        </option>
        <option id="others" value="others">
          Autres
        </option>
      </StyledSelect>
    </FormControl>
  );
}
