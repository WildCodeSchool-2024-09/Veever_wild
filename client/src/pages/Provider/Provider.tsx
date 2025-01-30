import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceDisplay from "../../services/Provider/PriceDisplay";
import TypeDisplay from "../../services/Provider/TypeDisplay";
import type { Chr } from "../../types/Provider/ProviderType";

export default function Provider() {
  const [chr, setChr] = useState<Chr | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/chr/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.info(data[0]);
        setChr(data[0]);
      });
  }, [id]);

  if (!chr) return <p>Loading...</p>;

  return (
    <section>
      {chr.images.length > 0 ? (
        chr.images.map((image, index) => {
          return (
            <img
              key={`${chr.name} ${index}`}
              src={`${import.meta.env.VITE_IMAGE_URL}/${image.link}`}
              alt={chr.name}
            />
          );
        })
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
