import { FormControl, FormLabel } from "@mui/material";
import { fr } from "date-fns/locale/fr";
import { useState } from "react";
import { StyledDatePicker } from "../../../services/FormCreateAcc/inputStyle";

export default function InputDate() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <FormControl className="formGroup">
      <FormLabel htmlFor="birthday">Votre date de naissance</FormLabel>
      <StyledDatePicker
        required
        className="birthdayCalendar"
        locale={fr}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        showIcon
        toggleCalendarOnIconClick
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </FormControl>
  );
}
