import { useState } from "react";
import { useStayLogic } from "../../components/Hooks/Stay/useStayLogic";
import StayBottomPage from "../../components/Stay/StayBottomPage";
import StayTopPage from "../../components/Stay/StayTopPage";

export default function Stay() {
  const { onChange } = useStayLogic();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDateChange = (date: Date) => {
    let updatedDates = [...selectedDates];
    if (updatedDates.some((d) => d.getTime() === date.getTime())) {
      updatedDates = updatedDates.filter((d) => d.getTime() !== date.getTime());
    } else {
      if (updatedDates.length < 3) {
        updatedDates.push(date);
      } else {
        setErrorMessage("Vous ne pouvez sélectionner que jusqu'à 3 jours.");
        return;
      }
    }
    setErrorMessage(null);
    setSelectedDates(updatedDates);
    onChange([updatedDates[0] || null, updatedDates[1] || null]);
  };

  return (
    <>
      <StayTopPage
        selectedDates={selectedDates}
        onChange={handleDateChange}
        errorMessage={errorMessage}
      />
      <StayBottomPage
        selectedDate={selectedDates[0]}
        selectedDays={selectedDates.length}
      />
    </>
  );
}
