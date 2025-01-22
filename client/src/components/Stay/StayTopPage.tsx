import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStayLogic } from "../Hooks/Stay/useStayLogic";
import "./StayTopPage.css";
import { Box } from "@mui/material";
import Slider from "@mui/material/Slider";

interface StayTopPageProps {
  selectedDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  errorMessage: string | null;
}

export default function StayTopPage({
  selectedDate,
  onChange,
  errorMessage,
}: StayTopPageProps) {
  const {
    hotel,
    setHotel,
    activity,
    setActivity,
    restaurant,
    setRestaurant,
    startDate,
    endDate,
    groupChoice,
    setGroupChoice,
    selectedNumber,
    setSelectedNumber,
    groupOptions,
    numberOptions,
  } = useStayLogic();

  const marks = [
    {
      value: 0,
      label: "€",
    },
    {
      value: 33,
      label: "€€",
    },
    {
      value: 66,
      label: "€€€",
    },
    {
      value: 100,
      label: "€€€€",
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }
  return (
    <main className="stay-container">
      <section className="calendar">
        <h2>Calendrier</h2>
        <>
          <DatePicker
            selected={selectedDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            isClearable
            minDate={new Date()}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      </section>

      <section className="group-choice">
        <label className="stay-label" htmlFor="group-choice">
          Type de groupe
        </label>
        <select
          className="stay-select"
          id="group-choice"
          value={groupChoice}
          onChange={(event) => setGroupChoice(event.target.value)}
        >
          <option value="" disabled>
            Sélectionnez une option
          </option>
          {groupOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </section>

      <section className="group-number">
        <label className="stay-label" htmlFor="group-number">
          Nombre de personnes
        </label>
        <select
          className="stay-select"
          id="group-number"
          value={selectedNumber}
          onChange={(event) => setSelectedNumber(event.target.value)}
        >
          <option value="" disabled>
            Sélectionnez un nombre de personnes
          </option>
          {numberOptions.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </section>

      <h2 className="title-checkbox">Préstations souhaitées</h2>
      <label className="checkbox-stay">
        <input
          className="checkbox-stay-input"
          type="checkbox"
          checked={hotel}
          onChange={() => setHotel(!hotel)}
        />
        Hôtels
      </label>
      <label className="checkbox-stay">
        <input
          className="checkbox-stay-input"
          type="checkbox"
          checked={activity}
          onChange={() => setActivity(!activity)}
        />
        Activités
      </label>
      <label className="checkbox-stay">
        <input
          className="checkbox-stay-input"
          type="checkbox"
          checked={restaurant}
          onChange={() => setRestaurant(!restaurant)}
        />
        Restaurants
      </label>
      <Box sx={{ width: 290 }}>
        <Slider
          aria-label="Custom marks"
          defaultValue={0}
          getAriaValueText={valuetext}
          step={33}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
    </main>
  );
}
