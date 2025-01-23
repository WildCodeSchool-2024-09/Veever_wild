export type MealOption = "dejeuner" | "diner" | "dejeuner-diner";

export interface TimeSlotSelection {
  selected: MealOption | null;
  date?: Date;
}
