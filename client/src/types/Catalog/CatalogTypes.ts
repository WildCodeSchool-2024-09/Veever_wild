export type CheckBoxProps = {
  all: boolean;
  hotels: boolean;
  restaurants: boolean;
  activities: boolean;
};

export type RecapChrProps = {
  name: string;
  emoji: string;
  count: number;
  type: "all" | "hotels" | "restaurants" | "activities";
};

export type CatalogBoxesProps = {
  filters: CheckBoxProps;
  onFilterChange: (filterName: keyof CheckBoxProps) => void;
};

export type CatalogRecapProps = {
  data: RecapChrProps[];
};
export type ChrCardProps = {
  count: number;
  id: number;
  images: { link: string }[];
  name: string;
  address: string;
  average_budget: number;
  category: string;
  type: "hotels" | "restaurants" | "activities";
};

export type ChrCardsProps = {
  id: number;
  images: { link: string }[];
  name: string;
  address: string;
  average_budget: number;
  category: string;
  cards: ChrCardProps[];
  type: string;
  setCards: (cards: ChrCardProps[]) => void;
};

export type Card = {
  count: number;
  id: number;
  images: { link: string }[];
  name: string;
  average_budget: number;
  address: string;
  type: "hotels" | "restaurants" | "activities";
};

export type Props = {
  children: React.ReactNode;
};

export type SaveCardsContextType = {
  saveCards: ChrCardProps[];
  versusCards: () => Card[];
  setSaveCards: React.Dispatch<React.SetStateAction<ChrCardProps[]>>;
  addCard: (card: ChrCardProps) => void;
  removeCard: (cardId: number) => void;
  isCardSaved: (cardId: number) => boolean;
};

export type CatalogueProps = {
  saveCards: ChrCardProps[];
};
