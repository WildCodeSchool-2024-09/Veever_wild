import { FormControl, FormLabel } from "@mui/material";
import { StyledInput } from "../../../services/Form/inputStyle";
import type { FormInput } from "../../../types/FormInput/FormInput";

export default function inputUsername({ handleChange, value }: FormInput) {
  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="username">Choisissez un nom d'utilisateur</FormLabel>
      <StyledInput
        required
        type="text"
        name="username"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        id="username"
        placeholder="Votre nom d'utilisateur"
      />
    </FormControl>
  );
}
