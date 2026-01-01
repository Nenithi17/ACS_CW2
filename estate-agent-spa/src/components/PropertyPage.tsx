import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Property } from '../types/Property';
import propertiesData from '../data/properties.json';
import { Gallery } from './Gallery';
import { TabsSection } from './TabsSection';
import { useFavourites } from '../hooks/useFavourites';

/**
 * PropertyPage component
 * Displays detailed information about a single property
 * Includes gallery, property details, and tabs section
 */
export const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const [property, setProperty] = useState<Property | null>(null);

  // Load property data
  useEffect(() => {
    const propertyId = Number(id);
    const foundProperty = (propertiesData as Property[]).find(
      (p) => p.id === propertyId
    );

    if (foundProperty) {
      setProperty(foundProperty);
    }
  }, [id]);

  /**
   * Handle toggle favourite
   */
  const handleToggleFavourite = () => {
    if (!property) return;

    if (isFavourite(property.id)) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  if (!property) {
    return (
      <div className="property-page-error">
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Search
        </button>
      </div>
    );
  }

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

  return (
    <div className="property-page">
      <button onClick={() => navigate('/')} className="btn btn-back">
        ← Back to Search
      </button>

      <div className="property-page-header">
        <div className="property-page-title-section">
          <h1 className="property-page-title">{property.shortDescription}</h1>
          <div className="property-page-price">{formatPrice(property.price)}</div>
        </div>
        <button
          className={`favourite-btn-large ${isFavourite(property.id) ? 'active' : ''}`}
          onClick={handleToggleFavourite}
          aria-label={isFavourite(property.id) ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourite(property.id) ? '★ Favourite' : '☆ Add to Favourites'}
        </button>
      </div>

      <div className="property-page-details">
        <div className="property-page-detail-item">
          <strong>Type:</strong> {property.type}
        </div>
        <div className="property-page-detail-item">
          <strong>Bedrooms:</strong> {property.bedrooms}
        </div>
        <div className="property-page-detail-item">
          <strong>Postcode:</strong> {property.postcode}
        </div>
        <div className="property-page-detail-item">
          <strong>Date Added:</strong> {new Date(property.dateAdded).toLocaleDateString('en-GB')}
        </div>
      </div>

      <div className="property-page-gallery">
        <Gallery images={property.images} alt={property.shortDescription} />
      </div>

      <div className="property-page-tabs">
        <TabsSection
          longDescription={property.longDescription}
          floorPlan={property.floorPlan}
          latitude={property.latitude}
          longitude={property.longitude}
        />
      </div>
    </div>
  );
};

