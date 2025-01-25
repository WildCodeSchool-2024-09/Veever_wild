import { useState } from "react";
import "./StayBottomPage.css";
import type { StayBottomPageProps } from "../../types/Stay/StayProps";

export default function StayBottomPage({
  selectedDates,
  checkBoxes,
  handleCheckboxChange,
}: StayBottomPageProps) {
  const [mealOptionsVisible, setMealOptionsVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const renderDaySections = () => {
    return selectedDates.map((date, dayIndex) => {
      const dayKey = `day-${dayIndex + 1}`;
      const displayDate = new Date(date);

      return (
        <section key={dayKey} className="day-checkbox-group">
          <h3>Journée du {displayDate.toLocaleDateString()}</h3>
          {["Restaurant", "Activité", "Hôtel"].map((option) => {
            const key = `${dayIndex + 1}-${option}`;
            return (
              <label key={key} className="box-bottom-stay">
                <input
                  type="checkbox"
                  checked={checkBoxes[key] || false}
                  onChange={() => {
                    handleCheckboxChange(key, option);
                    if (option === "Restaurant") {
                      // Toggle visibility of meal options
                      setMealOptionsVisible((prev) => ({
                        ...prev,
                        [dayKey]: !prev[dayKey],
                      }));
                    }
                  }}
                />
                {option}
              </label>
            );
          })}

          {/* Show meal options if Restaurant is checked */}
          {mealOptionsVisible[dayKey] && (
            <div className="meal-options">
              <label>
                <input
                  type="checkbox"
                  checked={
                    checkBoxes[`${dayIndex + 1}-Petit déjeuner`] || false
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      `${dayIndex + 1}-Petit déjeuner`,
                      "Petit déjeuner",
                    )
                  }
                />
                Petit déjeuner
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={checkBoxes[`${dayIndex + 1}-Déjeuner`] || false}
                  onChange={() =>
                    handleCheckboxChange(`${dayIndex + 1}-Déjeuner`, "Déjeuner")
                  }
                />
                Déjeuner
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={checkBoxes[`${dayIndex + 1}-Dîner`] || false}
                  onChange={() =>
                    handleCheckboxChange(`${dayIndex + 1}-Dîner`, "Dîner")
                  }
                />
                Dîner
              </label>
            </div>
          )}
        </section>
      );
    });
  };

  return (
    <main className="stay-container">
      <section>
        <h2>Sélectionner vos préstations</h2>
      </section>

      <section>{renderDaySections()}</section>

      <article className="other-informations">
        <h3>Autres informations</h3>
        <label>
          <input type="checkbox" />
          Accès PMR
        </label>
        <label>
          <input type="checkbox" />
          Kids friendly
        </label>
        <label>
          <input type="checkbox" />
          Animaux acceptés
        </label>
        <h3>Accessibilité</h3>
        <label>
          <input type="checkbox" />
          Véhiculé
        </label>
        <label>
          <input type="checkbox" />
          Transports en commun
        </label>
      </article>

      <button className="next-button" type="button">
        Suivant
      </button>
    </main>
  );
}
