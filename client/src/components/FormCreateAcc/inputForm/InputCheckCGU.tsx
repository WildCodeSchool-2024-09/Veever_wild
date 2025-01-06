import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function InputCheckCGU() {
  return (
    <FormControl className="formGroup checkCGU" required>
      <FormLabel className="checkLabel">
        Merci de bien vouloir lire les{" "}
        <Link to="/cgu-veever">conditions général d'utilisation</Link>
      </FormLabel>
      <div className="checkBox">
        <FormControlLabel control={<Checkbox />} label="Accepter" />
      </div>
    </FormControl>
  );
}
