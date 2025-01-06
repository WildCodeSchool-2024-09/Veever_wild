import { FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import { StyledTelInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputPhone() {
  const [value, setValue] = useState("+33");
  const handleChangePhone = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <FormControl className="formGroup phone" required>
      <FormLabel htmlFor="tel">Votre numéro de téléphone</FormLabel>
      <StyledTelInput
        id="tel"
        value={value}
        onChange={handleChangePhone}
        defaultCountry="FR"
      />
    </FormControl>
  );
}
