import { FormControl, FormLabel } from "@mui/material";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputLastName() {
  return (
    <>
      <FormControl className="formGroup" required>
        <FormLabel htmlFor="lastname">Votre Nom</FormLabel>
        <StyledInput
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Votre nom"
        />
      </FormControl>
    </>
  );
}
