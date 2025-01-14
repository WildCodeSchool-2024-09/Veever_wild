export type Filters = {
  all: boolean;
  hotels: boolean;
  restaurants: boolean;
  activities: boolean;
};

export type RecapItem = {
  name: string;
  emoji: string;
  count: number;
  type: "all" | "hotels" | "restaurants" | "activities"; // <--- Ici on pourrait mettre keyof de Filters
};

// Props pour CatalogBoxes
export type CatalogBoxesProps = {
  filters: Filters;
  onFilterChange: (filterName: keyof Filters) => void; //<--- keyof permet de prendre UNE clé de Filters
};

// Props pour CatalogRecap
export type CatalogRecapProps = {
  data: RecapItem[];
};
