import { Checkbox, FormControlLabel } from "@mui/material";

export default function InputCheckContact() {
  return (
    <fieldset className="formGroup">
      <label htmlFor="contact" className="checkLabel">
        Recevoir les réservations par E-mail ou par Téléphone ?
      </label>
      <div className="checkBox">
        <FormControlLabel control={<Checkbox />} label="E-mail" />
        <FormControlLabel control={<Checkbox />} label="Téléphone" />
      </div>
    </fieldset>
  );
}
