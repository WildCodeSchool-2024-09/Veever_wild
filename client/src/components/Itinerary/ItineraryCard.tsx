import "./ItinerayStyle.css";
import type { CardProps } from "../../types/Itinerary/ItineraryTypes";

const ItineraryCard = ({ title, imageSrc, onReserve }: CardProps) => {
  return (
    <section className="card">
      <img src={imageSrc} alt={title} className="card_image" />
      <h3 className="card-title">{title}</h3>
      <button type="button" className="reserve-button" onClick={onReserve}>
        Réserver
      </button>
    </section>
  );
};

export default ItineraryCard;
