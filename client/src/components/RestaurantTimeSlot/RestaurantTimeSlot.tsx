import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  MealOption,
  TimeSlotSelection,
} from "../../types/TimeSlot/TimeSlotTypes";
import "./RestaurantTimeSlot.css";

interface RestaurantTimeSlotProps {
  onSelectionChange: (selection: TimeSlotSelection) => void;
}

export default function RestaurantTimeSlot({
  onSelectionChange,
}: RestaurantTimeSlotProps) {
  const [selectedOption, setSelectedOption] = useState<MealOption | null>(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option: MealOption) => {
    setSelectedOption(option);
    onSelectionChange({ selected: option });
  };

  const handleNext = () => {
    if (selectedOption) {
      navigate("/restaurant/time-selection", {
        state: { mealOption: selectedOption },
      });
    }
  };

  return (
    <div className="restaurant-scheduler">
      <div className="scheduler-header">
        <h2>Horaires</h2>
        <div className="time-icons">
          <span className="time-icon">🌞</span>
          <span className="time-icon">🌙</span>
          <span className="time-icon">📅</span>
        </div>
      </div>

      <div className="scheduler-content">
        <h3>Quand souhaitez-vous aller au Restaurant ?</h3>

        <div className="meal-options">
          <button
            className={`meal-option ${selectedOption === "dejeuner" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("dejeuner")}
            type="button"
          >
            Déjeuner
          </button>

          <button
            className={`meal-option ${selectedOption === "diner" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("diner")}
            type="button"
          >
            Dîner
          </button>

          <button
            className={`meal-option ${selectedOption === "dejeuner-diner" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("dejeuner-diner")}
            type="button"
          >
            Déjeuner + Dîner
          </button>
        </div>

        {selectedOption && (
          <button
            className="next-button"
            onClick={handleNext}
            aria-label="Continuer"
            type="button"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}
