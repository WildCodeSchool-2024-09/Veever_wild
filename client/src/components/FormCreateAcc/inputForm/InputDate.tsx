import { FormControl, FormLabel } from "@mui/material";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import { StyledDatePicker } from "../../../services/Form/StyledDatePickers";
import type { FormInput } from "../../../types/FormInput/FormInput";

export default function InputDate({ handleChange, value }: FormInput) {
  const today = new Date().toISOString();
  registerLocale("fr", fr);
  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="birthday">Votre date de naissance</FormLabel>
      <StyledDatePicker
        id="birthday"
        required
        className="birthdayCalendar"
        locale="fr"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        showIcon
        toggleCalendarOnIconClick
        dateFormat="dd MMM yyyy"
        selected={value ? new Date(value) : new Date(today)}
        onChange={(date: Date | null) =>
          handleChange(date ? format(date, "dd MMM yyyy", { locale: fr }) : "")
        }
      />
    </FormControl>
  );
}
