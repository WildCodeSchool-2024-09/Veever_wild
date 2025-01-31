import { FormControl } from "@mui/material";
import { StyledInput } from "../../../services/Form/inputStyle";
import type { EmailValidation } from "../../../types/FormValidation/FormValidationCheck";

export default function InputEmail({
  email,
  handleEmailCheckChange,
  errors,
}: EmailValidation) {
  return (
    <FormControl className="formGroup">
      <StyledInput
        required
        value={email}
        onChange={handleEmailCheckChange}
        type="email"
        name="email"
        id="email"
        placeholder="Votre adresse e-mail"
      />
      {errors && <p className="errors">{errors.emailCheck}</p>}
    </FormControl>
  );
}
