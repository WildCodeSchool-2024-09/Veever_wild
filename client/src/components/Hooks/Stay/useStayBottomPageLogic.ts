import { useState } from "react";

export function useStayBottomPageLogic(
  selectedDates: Date[],
  checkBoxes: Record<string, boolean>,
  _handleCheckboxChange: (dayKey: string, option: string) => void,
) {
  const [mealOptionsVisible, setMealOptionsVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleMealVisibility = (dayKey: string) => {
    setMealOptionsVisible((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const getDaySections = () => {
    return selectedDates.map((date, dayIndex) => {
      const chosingDay = `day-${dayIndex + 1}`;
      const displayDate = new Date(date);

      const options = ["Restaurant", "Activité", "Hôtel"].map((option) => {
        const key = `${dayIndex + 1}-${option}`;
        return {
          key,
          option,
          isChecked: checkBoxes[key],
        };
      });

      const mealOptions = [
        { label: "Petit déjeuner", key: `${dayIndex + 1}-Petit déjeuner` },
        { label: "Déjeuner", key: `${dayIndex + 1}-Déjeuner` },
        { label: "Dîner", key: `${dayIndex + 1}-Dîner` },
      ].map((meal) => ({
        ...meal,
        isChecked: checkBoxes[meal.key],
      }));
      return {
        chosingDay,
        displayDate,
        options,
        mealOptions,
        isMealOptionsVisible: mealOptionsVisible[chosingDay],
      };
    });
  };

  return { getDaySections, toggleMealVisibility };
}
