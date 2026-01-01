import type { Property } from '../types/Property';
import { PropertyCard } from './PropertyCard';
import { useFavourites } from '../hooks/useFavourites';

/**
 * Props for PropertyList component
 */
interface PropertyListProps {
  properties: Property[];
}

/**
 * PropertyList component
 * Displays a grid of property cards
 */
export const PropertyList = ({ properties }: PropertyListProps) => {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  /**
   * Handle drag start for property card
   */
  const handleDragStart = (property: Property) => (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(property));
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Handle toggle favourite
   */
  const handleToggleFavourite = (property: Property) => () => {
    if (isFavourite(property.id)) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  if (properties.length === 0) {
    return (
      <div className="property-list-empty">
        <p>No properties found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      <h2 className="property-list-title">
        Found {properties.length} {properties.length === 1 ? 'property' : 'properties'}
      </h2>
      <div className="property-list-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavourite={isFavourite(property.id)}
            onToggleFavourite={handleToggleFavourite(property)}
            onDragStart={handleDragStart(property)}
          />
        ))}
      </div>
    </div>
  );
};

