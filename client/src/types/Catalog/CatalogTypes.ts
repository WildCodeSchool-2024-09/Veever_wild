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
export type Card = {
  count: number;
  id: number;
  picture: string;
  name: string;
  maxPrice: number;
  minPrice: number;
  category: string;
  address: string;
  type: "hotels" | "restaurants" | "activities";
};
export type Props = {
  children: React.ReactNode;
};

export type SaveCardsContextType = {
  saveCards: Card[];
  setSaveCards: React.Dispatch<React.SetStateAction<Card[]>>;
  addCard: (card: Card) => void;
  removeCard: (cardId: number) => void;
  isCardSaved: (cardId: number) => boolean;
};

export type CatalogueProps = {
  saveCards: Card[];
};
