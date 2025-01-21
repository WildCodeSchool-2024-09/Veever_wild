import type { CatalogRecapProps } from "../../../types/Catalog/CatalogTypes";
import "./CatalogRecap.css";

export default function CatalogRecap({ data }: CatalogRecapProps) {
  return (
    <>
      <ul className="catalog-filter-section">
        {data.map((item) => (
          <li key={item.name}>
            <hgroup>
              <h1>{item.name}</h1>
              <p className="emoji">{item.emoji}</p>
              <p>{item.count}</p>
            </hgroup>
          </li>
        ))}
      </ul>
      <h2 className="date-card">Date : 20-11-1994</h2>
      <button className="button-throw-likes-away" type="button">
        Vider les likes de ce jour
      </button>
    </>
  );
}
