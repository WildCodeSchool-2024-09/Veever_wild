import { FormControl, FormLabel } from "@mui/material";
import { StyledSelect } from "../../../services/FormCreateAcc/StyledSelect";
import type { FormInput } from "../../../types/FormInput/FormInput";

export default function InputGender({ handleChange, value }: FormInput) {
  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="gender">Votre genre</FormLabel>
      <StyledSelect
        required
        name="gender"
        id="gender"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Veuillez sélectionner</option>
        <option value="Men">Homme</option>
        <option value="Women">Femme</option>
        <option value="Others">Autres</option>
      </StyledSelect>
    </FormControl>
  );
}
