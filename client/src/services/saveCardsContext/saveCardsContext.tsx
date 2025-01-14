import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

// Type pour une carte
type Card = {
  id: number;
  picture: string;
  name: string;
  maxPrice: number;
  address: string;
};

// Type du contexte
interface SaveCardsContextType {
  saveCards: Card[];
  setSaveCards: React.Dispatch<React.SetStateAction<Card[]>>;
  addCard: (card: Card) => void;
  removeCard: (cardId: number) => void;
  isCardSaved: (cardId: number) => boolean;
}

// Création du contexte
const SaveCardsContext = createContext<SaveCardsContextType | undefined>(
  undefined,
);

// Provider du contexte
export function SaveCardsProvider({ children }: Props) {
  const [saveCards, setSaveCards] = useState<Card[]>([]);

  const addCard = (card: Card) => {
    setSaveCards((prevCards) => {
      if (!prevCards.some((c) => c.id === card.id)) {
        return [...prevCards, card];
      }
      return prevCards;
    });
  };

  const removeCard = (cardId: number) => {
    setSaveCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const isCardSaved = (cardId: number) => {
    return saveCards.some((card) => card.id === cardId);
  };

  const value = {
    saveCards,
    setSaveCards,
    addCard,
    removeCard,
    isCardSaved,
  };

  return (
    <SaveCardsContext.Provider value={value}>
      {children}
    </SaveCardsContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useSaveCards() {
  const context = useContext(SaveCardsContext);

  if (!context) {
    throw new Error(
      "useSaveCards doit être utilisé à l'intérieur de SaveCardsProvider",
    );
  }

  return context;
}
