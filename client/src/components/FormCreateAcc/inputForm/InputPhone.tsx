import { useState } from "react";
import { StyledTelInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputPhone() {
  const [value, setValue] = useState("+33");
  const handleChangePhone = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <fieldset className="formGroup">
      <label htmlFor="tel">Votre numéro de téléphone</label>
      <StyledTelInput
        className="phone"
        value={value}
        onChange={handleChangePhone}
        defaultCountry="FR"
      />
    </fieldset>
  );
}
