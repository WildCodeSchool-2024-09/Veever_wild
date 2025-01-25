export type StayTopPageProps = {
  selectedDates: Date[];
  onChange: (date: Date) => void;
  errorMessage: string | null;
};

export type StayBottomPageProps = {
  selectedDate: Date | null;
  selectedDays: number;
  selectedDates: Date[];
  mealOptionsVisible: { [key: string]: boolean };
  setMealOptionsVisible: (mealOptionsVisible: {
    [key: string]: boolean;
  }) => void;
  handleCheckboxChange: (dayKey: string, option: string) => void;
  checkBoxes: { [key: string]: boolean };
};
