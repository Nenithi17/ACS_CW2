import { useNavigate } from 'react-router-dom';
import type { Property } from '../types/Property';

/**
 * Props for PropertyCard component
 */
interface PropertyCardProps {
  property: Property;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onDragStart: (e: React.DragEvent) => void;
}

/**
 * PropertyCard component
 * Displays property information in a card format
 * Supports drag & drop and favourite button
 */
export const PropertyCard = ({
  property,
  isFavourite,
  onToggleFavourite,
  onDragStart,
}: PropertyCardProps) => {
  const navigate = useNavigate();

  /**
   * Format price as currency
   */
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  /**
   * Handle card click to navigate to property page
   */
  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div
      className="property-card"
      draggable
      onDragStart={onDragStart}
      onClick={handleCardClick}
    >
      <div className="property-card-image">
        <img
          src={property.images[0]}
          alt={property.shortDescription}
          loading="lazy"
        />
        <button
          className={`favourite-btn ${isFavourite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite();
          }}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourite ? '★' : '☆'}
        </button>
      </div>

      <div className="property-card-content">
        <div className="property-card-price">{formatPrice(property.price)}</div>
        <h3 className="property-card-title">{property.shortDescription}</h3>
        <div className="property-card-details">
          <span className="property-card-bedrooms">
            {property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
          </span>
          <span className="property-card-type">{property.type}</span>
          <span className="property-card-postcode">{property.postcode}</span>
        </div>
      </div>
    </div>
  );
};

