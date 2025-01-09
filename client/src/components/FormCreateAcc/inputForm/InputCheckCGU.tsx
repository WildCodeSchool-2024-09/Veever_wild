import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function InputCheckCGU() {
  return (
    <FormControl className="formGroup checkCGU">
      <FormLabel className="checkLabel">
        Merci de bien vouloir lire les{" "}
        <Link to="/cgu-veever">conditions général d'utilisation</Link>
      </FormLabel>
      <FormControlLabel
        className="checkBox"
        required
        control={<Checkbox />}
        label="Accepter"
      />
    </FormControl>
  );
}
