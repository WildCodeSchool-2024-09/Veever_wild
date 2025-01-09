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
  type: keyof Filters;
};

// Props pour CatalogBoxes
export type CatalogBoxesProps = {
  filters: Filters;
  onFilterChange: (filterName: keyof Filters) => void;
};

// Props pour CatalogRecap
export type CatalogRecapProps = {
  data: RecapItem[];
};
