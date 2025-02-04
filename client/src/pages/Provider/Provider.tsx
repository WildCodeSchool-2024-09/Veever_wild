import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import PriceDisplay from "../../services/Provider/PriceDisplay";
import TypeDisplay from "../../services/Provider/TypeDisplay";
import type { Chr } from "../../types/Provider/ProviderType";

export default function Provider() {
  const chr = useLoaderData() as Chr;
  const [photosToDisplay, setPhotosToDisplay] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    try {
      const filteredPhotos = filterPhotosByDevice(chr.images, isMobile);
      setPhotosToDisplay(filteredPhotos);
    } catch (error) {
      setError("Erreur lors de la récupération des photos.");
    } finally {
      setLoading(false);
    }
  }, [chr.images]);

  const filterPhotosByDevice = (
    images: { link: string }[],
    isMobile: boolean,
  ): string[] => {
    return images
      .filter(
        (image) =>
          (isMobile && image.link.includes("mobile")) ||
          (!isMobile && image.link.includes("desktop")),
      )
      .map((image) => image.link);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!chr) return <p>Aucun prestataire trouvé.</p>;

  return (
    <section>
      {chr.images.length > 0 ? (
        photosToDisplay.map((image, index) => (
          <img
            key={`${chr.name} ${index}`}
            src={`${import.meta.env.VITE_IMAGE_URL}/${image}`}
            alt={chr.name}
          />
        ))
      ) : (
        <p>Photo indisponible</p>
      )}
      <h1>{chr.name}</h1>
      <ul>
        <li>
          <TypeDisplay type={chr.type} />
        </li>
        {chr.type === "activity" ? (
          <li>
            {+chr.additional_info / 60}
            {+chr.additional_info / 60 > 1 ? " heures" : " heure"}
          </li>
        ) : (
          <li>{chr.additional_info}</li>
        )}
        <li>
          <PriceDisplay price={+chr.average_budget} />
        </li>
      </ul>

      <article>
        <h2>À propos</h2>
        <p>{chr.description}</p>
      </article>
    </section>
  );
}
