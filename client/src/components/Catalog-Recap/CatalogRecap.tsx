import "./CatalogRecap.css";
import type { CatalogRecapProps } from "../../types/Catalog/CatalogTypes";

export default function CatalogRecap({ data }: CatalogRecapProps) {
  return (
    <ul className="catalog-filter-section">
      {data.map((item) => (
        <li key={item.name}>
          <h2>{item.name}</h2>
          <p className="emoji">{item.emoji}</p>
          <p>{item.count}</p>
        </li>
      ))}
    </ul>
  );
}
