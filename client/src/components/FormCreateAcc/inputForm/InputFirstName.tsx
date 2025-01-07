import { FormControl, FormLabel } from "@mui/material";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputFirstName() {
  return (
    <>
      <FormControl className="formGroup">
        <FormLabel htmlFor="firstname">Votre Prénom</FormLabel>
        <StyledInput
          required
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Votre prénom"
        />
      </FormControl>
    </>
  );
}
