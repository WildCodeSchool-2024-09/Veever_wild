import { FormControl, FormLabel } from "@mui/material";
import useEmailCheck from "../../../services/FormCreateAcc/emailCheck";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputEmail() {
  const { email, errors, handleChangeEmail } = useEmailCheck();

  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="email">Votre adresse e-mail</FormLabel>
      <StyledInput
        required
        onChange={handleChangeEmail}
        type="email"
        name="email"
        id="email"
        placeholder="Votre e-mail"
        value={email}
      />
      {errors && <p className="errors">{errors}</p>}
    </FormControl>
  );
}
