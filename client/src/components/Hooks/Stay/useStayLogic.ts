import { useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 1000;

export function useStayLogic() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [groupChoice, setGroupChoice] = useState<string>("");
  const [selectedNumber, setSelectedNumber] = useState<number | string>("");

  const [priceRange, setPriceRange] = useState<number[]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);

  const threeDaysMaximum = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      const diffInDays =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      if (diffInDays > 3) {
        setErrorMessage("Le séjour ne peut pas dépasser 3 jours.");
        return false;
      }
    }
    setErrorMessage(null);
    return true;
  };

  const onChange = (dates: [Date | null, Date | null]) => {
    if (threeDaysMaximum(dates)) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };
  const handlePriceRangeChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const groupOptions = ["Famille", "Amis", "Couple", "Seul"];
  const numberOptions = [];
  for (let i = 1; i <= 12; i++) {
    numberOptions.push(i);
  }

  const formatPrice = (value: number) => `${value}€`;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [hotel, setHotel] = useState(false);
  const [activity, setActivity] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  return {
    isCalendarOpen,
    setIsCalendarOpen,
    hotel,
    setHotel,
    activity,
    setActivity,
    restaurant,
    setRestaurant,
    errorMessage,
    startDate,
    endDate,
    threeDaysMaximum,
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
  };
}
