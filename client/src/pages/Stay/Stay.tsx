import { useState } from "react";
import { useStayLogic } from "../../components/Hooks/Stay/useStayLogic";
import StayBottomPage from "../../components/Stay/StayBottomPage";
import StayTopPage from "../../components/Stay/StayTopPage";

export default function Stay() {
  const { onChange } = useStayLogic();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New state variables
  const [mealOptionsVisible, setMealOptionsVisible] = useState<{
    [key: string]: boolean;
  }>({});

  // Add back checkBoxes state
  const [checkBoxes, _] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (dayKey: string, option: string) => {
    setMealOptionsVisible((prev) => ({
      ...prev,
      [`${dayKey}-${option}`]: !prev[`${dayKey}-${option}`],
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    const updatedDates = [...selectedDates];
    const dateIndex = updatedDates.findIndex(
      (d) => d.getTime() === date.getTime(),
    );

    if (dateIndex !== -1) {
      updatedDates.splice(dateIndex, 1);
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
        setSelectedDates={setSelectedDates}
      />
      <StayBottomPage
        selectedDates={selectedDates}
        selectedDate={selectedDates[0] || null}
        selectedDays={selectedDates.length}
        mealOptionsVisible={mealOptionsVisible}
        setMealOptionsVisible={setMealOptionsVisible}
        handleCheckboxChange={handleCheckboxChange}
        checkBoxes={checkBoxes}
      />
    </>
  );
}
