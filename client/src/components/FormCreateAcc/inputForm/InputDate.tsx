import { fr } from "date-fns/locale/fr";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function InputDate() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <fieldset className="formGroup">
      <label htmlFor="birthday">Votre date de naissance</label>
      <DatePicker
        className="birthdayCalendar"
        required
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
    </fieldset>
  );
}
