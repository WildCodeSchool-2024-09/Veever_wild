import { Checkbox, FormControlLabel } from "@mui/material";

export default function InputCheckCGU() {
  return (
    <fieldset className="formGroup">
      <label htmlFor="checkCGU" className="checkLabel">
        Merci de bien vouloir lire les{" "}
        <a href="/cgu-veever">conditions général d'utilisation</a>
      </label>
      <div className="checkBox">
        <FormControlLabel required control={<Checkbox />} label="Accepter" />
      </div>
    </fieldset>
  );
}
