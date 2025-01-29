import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  AvailableDate,
  MealOption,
  TimeSlotSelection,
} from "../../types/TimeSlot/TimeSlotTypes";
import "./RestaurantTimeSlot.css";

interface RestaurantTimeSlotProps {
  onSelectionChange: (selection: TimeSlotSelection) => void;
  availableDates?: AvailableDate[]; // Dates reçues du composant parent
}

export default function RestaurantTimeSlot({
  availableDates = [
    // Dates par défaut pour tester le composant
    { date: "2024-01-18", isAvailable: true },
    { date: "2024-01-19", isAvailable: true },
    { date: "2024-01-20", isAvailable: true },
  ],
}: RestaurantTimeSlotProps) {
  const [selectedOptionsByDate, setSelectedOptionsByDate] = useState<
    Record<string, MealOption[]>
  >({});
  const [selectedDate, setSelectedDates] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleOptionSelect = (date: string, option: MealOption) => {
    setSelectedOptionsByDate((prevOptions) => {
      const optionsForDates = prevOptions[date] || [];
      if (optionsForDates.includes(option)) {
        return {
          ...prevOptions,
          [date]: optionsForDates.filter((opt) => opt !== option),
        };
      }
      return {
        ...prevOptions,
        [date]: [...optionsForDates, option],
      };
    });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDates((prevDates) => {
      if (prevDates.includes(date)) {
        return prevDates.filter((d) => d !== date);
      }
      return [...prevDates, date];
    });
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "EEEE d MMMM", { locale: fr });
  };

  const handleNext = () => {
    if (selectedDate.length > 0) {
      const selections = selectedDate.map((date) => ({
        date,
        mealOptions: selectedOptionsByDate[date] || [],
      }));
      navigate("/restaurant/time-selection", {
        state: { selections },
      });
    }
  };

  return (
    <Box className="restaurant-scheduler">
      <header className="page-header">
        <IconButton onClick={() => navigate(-1)} aria-label="Retour">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Horaires
        </Typography>
      </header>

      <Paper elevation={3} className="scheduler-header">
        <Typography variant="h4" component="h2" className="header-title">
          Restaurant
        </Typography>
      </Paper>

      <Box className="scheduler-content">
        <Typography variant="h6" component="h3" className="question-text">
          Sélectionnez une date :
        </Typography>

        <Box
          sx={{
            display: "flex",
            flex: "wrap",
            gap: 0.5,
            justifyContent: "center",
          }}
        >
          {availableDates.map((availableDate) => (
            <Box key={availableDate.date}>
              <Paper
                elevation={selectedDate.includes(availableDate.date) ? 6 : 1}
                className={`date-option ${selectedDate.includes(availableDate.date) ? "selected" : ""} ${!availableDate.isAvailable ? "disabled" : ""}`}
                onClick={() => {
                  if (availableDate.isAvailable) {
                    handleDateSelect(availableDate.date);
                  }
                }}
              >
                <Typography>{formatDate(availableDate.date)}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {selectedDate
          .slice()
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
          .map((date) => (
            <Box key={date}>
              <Typography variant="h6" component="h3" className="question-text">
                Choisissez votre service pour le {formatDate(date)} :
              </Typography>
              <Grid container spacing={2} className="meal-options-container">
                <Paper
                  elevation={
                    selectedOptionsByDate[date]?.includes("dejeuner") ? 6 : 1
                  }
                  className={`meal-option ${selectedOptionsByDate[date]?.includes("dejeuner") ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(date, "dejeuner")}
                >
                  <RestaurantIcon className="meal-icon" />
                  <Typography>Déjeuner</Typography>
                </Paper>
                <Paper
                  elevation={
                    selectedOptionsByDate[date]?.includes("diner") ? 6 : 1
                  }
                  className={`meal-option ${selectedOptionsByDate[date]?.includes("diner") ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(date, "diner")}
                >
                  <DinnerDiningIcon className="meal-icon" />
                  <Typography>Dîner</Typography>
                </Paper>
                <Paper
                  elevation={
                    selectedOptionsByDate[date]?.includes("dejeuner-diner")
                      ? 6
                      : 1
                  }
                  className={`meal-option ${selectedOptionsByDate[date]?.includes("dejeuner-diner") ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(date, "dejeuner-diner")}
                >
                  <Box className="double-icon">
                    <RestaurantIcon className="meal-icon" />
                    <DinnerDiningIcon className="meal-icon" />
                  </Box>
                  <Typography>Déjeuner + Dîner</Typography>
                </Paper>
              </Grid>
            </Box>
          ))}

        {selectedDate.length > 0 && (
          <IconButton
            onClick={handleNext}
            aria-label="Suivant"
            className="next-button"
          >
            <ArrowForwardIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
