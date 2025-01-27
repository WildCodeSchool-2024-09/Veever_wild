import { useStayLogic } from "../../components/Hooks/Stay/useStayLogic";
import StayBottomPage from "../../components/Stay/StayBottomPage";
import StayTopPage from "../../components/Stay/StayTopPage";

export default function Stay() {
  const {
    selectedDates,
    setSelectedDates,
    errorMessage,
    handleDateChange,
    mealOptionsVisible,
    setMealOptionsVisible,
    handleCheckboxChange,
    checkBoxes,
  } = useStayLogic();

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
