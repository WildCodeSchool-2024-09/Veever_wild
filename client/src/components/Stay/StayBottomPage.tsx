import { useStayLogic } from "../Hooks/Stay/useStayLogic";

export default function StayBottomPage() {
  const { hotel, setHotel, activity, setActivity, restaurant, setRestaurant } =
    useStayLogic();
  return (
    <main>
      <section>
        <h2>Séléctionner vos préstations</h2>
        <label>
          <input
            type="checkbox"
            checked={hotel}
            onChange={() => setHotel(!hotel)}
          />
          Hôtel
        </label>
        <label>
          <input
            type="checkbox"
            checked={activity}
            onChange={() => setActivity(!activity)}
          />
          Activité
        </label>
        <label>
          <input
            type="checkbox"
            checked={restaurant}
            onChange={() => setRestaurant(!restaurant)}
          />
          Restaurant
        </label>
      </section>
    </main>
  );
}
