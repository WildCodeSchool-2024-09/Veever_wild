import { FormControl, FormLabel } from "@mui/material";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function inputUsername() {
  return (
    <FormControl className="formGroup" required>
      <FormLabel htmlFor="username">Choisissez un nom d'utilisateur</FormLabel>
      <StyledInput
        type="text"
        name="username"
        id="username"
        placeholder="Votre nom d'utilisateur"
      />
    </FormControl>
  );
}
