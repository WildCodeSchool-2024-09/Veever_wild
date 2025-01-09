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
        Pour les réservations préférez vous être contacté par:
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
      >
        <FormControlLabel
          className="checkBox"
          id="email"
          value="email"
          control={<Radio id="email" />}
          label="E-mail"
        />
        <FormControlLabel
          className="checkBox"
          value="tel"
          id="tel"
          control={<Radio id="tel" />}
          label="Téléphone"
        />
      </RadioGroup>
    </FormControl>
  );
}
