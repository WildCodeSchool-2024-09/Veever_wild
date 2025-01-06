import { FormControl, FormLabel } from "@mui/material";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";
export default function InputEmail() {
  return (
    <FormControl className="formGroup" required>
      <FormLabel htmlFor="email">Votre adresse e-mail</FormLabel>
      <StyledInput
        type="email"
        name="email"
        id="email"
        placeholder="Votre e-mail"
      />
    </FormControl>
  );
}
