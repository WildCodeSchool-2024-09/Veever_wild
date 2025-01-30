import type { CatalogCheckboxProps } from "../../../types/Catalog/CatalogTypes";

export const CatalogCheckbox = ({
  label,
  checked,
  onChange,
  emoji,
}: CatalogCheckboxProps) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`catalog-emoji-checkbox ${checked ? "checked" : ""}`}
      aria-label={label}
    >
      {emoji} <span className="count">{label}</span>
    </button>
  );
};
