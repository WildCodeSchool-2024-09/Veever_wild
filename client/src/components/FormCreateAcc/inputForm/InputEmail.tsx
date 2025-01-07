import { FormControl, FormLabel } from "@mui/material";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";
import type { EmailValidation } from "../../../types/FormValidation/FormValidationCheck";

export default function InputEmail({
  email,
  errors,
  handleEmailCheckChange,
}: EmailValidation) {
  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="email">Votre adresse e-mail</FormLabel>
      <StyledInput
        required
        onChange={handleEmailCheckChange}
        type="email"
        name="email"
        id="email"
        placeholder="Votre e-mail"
        value={email}
      />
      {errors && <p className="errors">{errors.emailCheck}</p>}
    </FormControl>
  );
}
