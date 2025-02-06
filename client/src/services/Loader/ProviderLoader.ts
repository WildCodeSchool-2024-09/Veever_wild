import type { Params } from "react-router-dom";

export const providerLoader = async ({ params }: { params: Params }) => {
  const { id } = params;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chr/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Erreur de récupération des données");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw new Error("Erreur de chargement des données");
  }
};
