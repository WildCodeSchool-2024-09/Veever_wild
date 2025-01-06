import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function InputCheckContact() {
  return (
    <FormControl className="formGroup checkContact" required>
      <FormLabel id="demo-radio-buttons-group-label">
        Pour les réservations préférez vous être contacter par:
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
      >
        <div className="checkBox">
          <FormControlLabel value="email" control={<Radio />} label="E-mail" />
          <FormControlLabel value="tel" control={<Radio />} label="Téléphone" />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
