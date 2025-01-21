import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStayLogic } from "../Hooks/Stay/useStayLogic";
import "./StayTopPage.css";
import { Box, Typography } from "@mui/material";
import { StyledSlider } from "../Hooks/Stay/SliderStyles";

export default function Stay() {
  const {
    isCalendarOpen,
    setIsCalendarOpen,
    hotel,
    setHotel,
    activity,
    setActivity,
    restaurant,
    setRestaurant,
    startDate,
    endDate,
    errorMessage,
    onChange,
    groupChoice,
    setGroupChoice,
    selectedNumber,
    setSelectedNumber,
    groupOptions,
    numberOptions,
    priceRange,
    handlePriceRangeChange,
    formatPrice,
    MIN_PRICE,
    MAX_PRICE,
  } = useStayLogic();

  return (
    <main className="stay-container">
      <section className="calendar">
        <label className="stay-label" htmlFor="date-picker">
          Calendrier
        </label>
        <button
          type="button"
          id="date-picker"
          className="stay-button"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          {startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : "Choisissez une date"}
        </button>
        {isCalendarOpen && (
          <>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
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
      <Box sx={{ width: 300, padding: 2 }}>
        <Typography gutterBottom>
          Gamme de prix: {formatPrice(priceRange[0])} -{" "}
          {formatPrice(priceRange[1])}
        </Typography>
        <StyledSlider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={50}
          valueLabelFormat={formatPrice}
        />
      </Box>
    </main>
  );
}
