import RestaurantTimeSlot from "../../components/RestaurantTimeSlot/RestaurantTimeSlot";
import type { TimeSlotSelection } from "../../types/TimeSlot/TimeSlotTypes";

export default function RestaurantPage() {
  const handleSelectionChange = (_selection: TimeSlotSelection) => {
    // À implémenter plus tard
  };

  return <RestaurantTimeSlot onSelectionChange={handleSelectionChange} />;
}
