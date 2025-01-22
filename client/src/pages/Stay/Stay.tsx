import { useState } from "react";
import { useStayLogic } from "../../components/Hooks/Stay/useStayLogic";
import StayBottomPage from "../../components/Stay/StayBottomPage";
import StayTopPage from "../../components/Stay/StayTopPage";

export default function Stay() {
  const { onChange } = useStayLogic();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDays, setSelectedDays] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      const diffInDays = Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
      );
      if (diffInDays > 2) {
        setErrorMessage("Vous ne pouvez sélectionner que jusqu'à 3 jours.");
        return;
      }
      setSelectedDays(diffInDays + 1);
    } else {
      setSelectedDays(1);
    }
    setErrorMessage(null);
    setSelectedDate(start);
    onChange(dates);
  };
  return (
    <>
      <StayTopPage
        selectedDate={selectedDate}
        onChange={handleDateChange}
        errorMessage={errorMessage}
      />
      <StayBottomPage selectedDate={selectedDate} selectedDays={selectedDays} />
    </>
  );
}
