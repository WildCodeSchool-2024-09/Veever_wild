import { useStayLogic } from "../Hooks/Stay/useStayLogic";
import "./StayBottomPage.css";
interface StayBottomPageProps {
  selectedDate: Date | null;
  selectedDays: number;
}
export default function StayBottomPage({
  selectedDate,
  selectedDays,
}: StayBottomPageProps) {
  const { checkBoxes, handleCheckboxChange } = useStayLogic();

  return (
    <main className="stay-container">
      <section>
        <h2>Sélectionner vos préstations</h2>
      </section>

      <section>
        {selectedDays > 0 &&
          [...Array(selectedDays)].map((_, dayIndex) => {
            const dayKey = `day-${dayIndex + 1}`;
            const displayDate = selectedDate ? new Date(selectedDate) : null;
            if (displayDate) {
              displayDate.setDate(displayDate.getDate() + dayIndex);
            }
            return (
              <section key={dayKey} className="day-checkbox-group">
                <h3>
                  Journée du{" "}
                  {displayDate
                    ? displayDate.toLocaleDateString()
                    : dayIndex + 1}
                </h3>
                {["Restaurant", "Activité", "Hôtel"].map((option) => {
                  const key = `${dayIndex + 1}-${option}`;
                  return (
                    <label key={key} className="box-bottom-stay">
                      <input
                        type="checkbox"
                        checked={checkBoxes[key] || false}
                        onChange={() => handleCheckboxChange(key)}
                      />
                      {option}
                    </label>
                  );
                })}
              </section>
            );
          })}
      </section>

      <section>
        <h2>Restauration</h2>
        <label className="box-bottom-stay">
          <input type="checkbox" />
          Petit déjeuner
        </label>
        <label className="box-bottom-stay">
          <input type="checkbox" />
          Déjeuner
        </label>
        <label className="box-bottom-stay">
          <input type="checkbox" />
          Diner
        </label>
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
