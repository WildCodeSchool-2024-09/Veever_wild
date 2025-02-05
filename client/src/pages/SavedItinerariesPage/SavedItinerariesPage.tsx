import { useEffect, useState } from "react";
import ItineraryCalendar from "../../components/Saved-Itineraries/SavedItinerariesCalendar/SavedItinerariesCalendar";
import ItineraryFilters from "../../components/Saved-Itineraries/SavedItinerariesFilters/SavedItinerariesFilters";
import ItineraryList from "../../components/Saved-Itineraries/SavedItinerariesList/SavedItinerariesList";
import type {
  Itinerary,
  ItineraryStatus,
  ViewMode,
} from "../../types/SavedItinerariesTypes/SavedItinerariesTypes";

export default function SavedItinerariesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedFilters, setSelectedFilters] = useState<ItineraryStatus[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  // [itineraries] À remplacer par un appel API

  useEffect(() => {
    fetch("/api/itineraries")
      .then((response) => response.json())
      .then((data) => setItineraries(data))
      .catch((error) => console.error("Error fetching itineraries:", error));
  }, []);

  const handleFilterChange = (status: ItineraryStatus) => {
    setSelectedFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  return (
    <main className="my-itineraries">
      <h1>Mes Itinéraires</h1>
      <ItineraryFilters
        filters={[
          { label: "Créés", value: "created", count: 0 },
          { label: "Réservés", value: "reserved", count: 0 },
          { label: "Finalisés", value: "completed", count: 0 },
        ]}
        selectedFilters={selectedFilters}
        viewMode={viewMode}
        onFilterChange={handleFilterChange}
        onViewModeChange={setViewMode}
      />
      {viewMode === "list" ? (
        <ItineraryList itineraries={itineraries} />
      ) : (
        <ItineraryCalendar itineraries={itineraries} />
      )}
    </main>
  );
}
