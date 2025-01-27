import "./StayBottomPage.css";
import type { StayBottomPageProps } from "../../types/Stay/StayProps";
import { useStayBottomPageLogic } from "../Hooks/Stay/useStayBottomPageLogic";

export default function StayBottomPage({
  selectedDates,
  checkBoxes,
  handleCheckboxChange,
}: StayBottomPageProps) {
  const { getDaySections, toggleMealVisibility } = useStayBottomPageLogic(
    selectedDates,
    checkBoxes,
    handleCheckboxChange,
  );

  const daySections = getDaySections();

  return (
    <main className="stay-container">
      <section>
        <h2>Sélectionner vos préstations</h2>
      </section>

      <section>
        {daySections.map(
          ({
            chosingDay,
            displayDate,
            options,
            mealOptions,
            isMealOptionsVisible,
          }) => (
            <section key={chosingDay} className="day-checkbox-group">
              <h3>Journée du {displayDate.toLocaleDateString()}</h3>
              {options.map(({ key, option, isChecked }) => (
                <label key={key} className="box-bottom-stay">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      handleCheckboxChange(key, option);
                      if (option === "Restaurant") {
                        toggleMealVisibility(chosingDay);
                      }
                    }}
                  />
                  {option}
                </label>
              ))}

              {isMealOptionsVisible && (
                <div className="meal-options">
                  {mealOptions.map(({ label, key, isChecked }) => (
                    <label key={key}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(key, label)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              )}
            </section>
          ),
        )}
      </section>

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
