import { useNavigate } from 'react-router-dom';
import type { Property } from '../types/Property';
import { useFavourites } from '../hooks/useFavourites';

/**
 * FavouritesPanel component
 * Displays favourite properties with drag & drop support
 * Allows removal via drag-out or delete button
 */
export const FavouritesPanel = () => {
  const navigate = useNavigate();
  const { favourites, removeFavourite, clearFavourites, addFavourite } = useFavourites();

  /**
   * Handle drop event when property is dragged into favourites panel
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    
    if (data) {
      try {
        const property: Property = JSON.parse(data);
        addFavourite(property);
      } catch (error) {
        console.error('Error parsing dropped property:', error);
      }
    }
  };

  /**
   * Handle drag over to allow drop
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

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
   * Handle property click to navigate to property page
   */
  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div
      className="favourites-panel"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="favourites-panel-header">
        <h2>Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button
            onClick={clearFavourites}
            className="btn btn-clear"
            aria-label="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-panel-empty">
          <p>No favourites yet.</p>
          <p className="favourites-hint">
            Drag a property card here or click the star button to add favourites.
          </p>
        </div>
      ) : (
        <div className="favourites-panel-list">
          {favourites.map((property) => (
            <div
              key={property.id}
              className="favourite-item"
              onClick={() => handlePropertyClick(property.id)}
            >
              <div className="favourite-item-image">
                <img
                  src={property.images[0]}
                  alt={property.shortDescription}
                  loading="lazy"
                />
              </div>
              <div className="favourite-item-content">
                <div className="favourite-item-price">{formatPrice(property.price)}</div>
                <div className="favourite-item-description">
                  {property.shortDescription}
                </div>
                <div className="favourite-item-details">
                  {property.bedrooms} bed • {property.type} • {property.postcode}
                </div>
              </div>
              <button
                className="favourite-item-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavourite(property.id);
                }}
                aria-label="Remove from favourites"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

