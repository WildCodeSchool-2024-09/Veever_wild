export type StayTopPageProps = {
  selectedDates: Date[];
  onChange: (date: Date) => void;
  errorMessage: string | null;
};

export type StayBottomPageProps = {
  selectedDate: Date | null;
  selectedDays: number;
};
