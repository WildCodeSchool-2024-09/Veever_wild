import "./CatalogRecap.css";

export default function CatalogRecap() {
  const date = new Date();

  return (
    <>
      <p className="date-card">
        Date :{" "}
        {date.toLocaleDateString("fr-FR", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </>
  );
}
