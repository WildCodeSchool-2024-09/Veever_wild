import VersusCard from "../../components/VersusCard/VersusCard";
import { useSaveCards } from "../../services/saveCardsContext/saveCardsContext";

// export the VersusPage component and limit the number of cards to 2
export default function VersusPage() {
  const { versusCards } = useSaveCards();

  const versusCardsSlice = versusCards();
  return (
    <>
      <main className="versus">
        <h1 className="versus-title">Résultats</h1>
        <h2 className="versus-subtitle">Choissisez votre activité</h2>
        <VersusCard versusCards={versusCardsSlice} />
      </main>
    </>
  );
}
