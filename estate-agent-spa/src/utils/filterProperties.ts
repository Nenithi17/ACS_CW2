import type { Property, SearchCriteria } from '../types/Property';

/**
 * Pure function to filter properties based on search criteria
 * Empty criteria are ignored (treated as no filter)
 * 
 * @param properties - Array of properties to filter
 * @param criteria - Search criteria object
 * @returns Filtered array of properties matching all specified criteria
 */
export const filterProperties = (
  properties: Property[],
  criteria: SearchCriteria
): Property[] => {
  return properties.filter((property) => {
    // Property type filter
    if (criteria.type !== undefined && property.type !== criteria.type) {
      return false;
    }

    // Price range filter
    if (criteria.minPrice !== undefined && property.price < criteria.minPrice) {
      return false;
    }
    if (criteria.maxPrice !== undefined && property.price > criteria.maxPrice) {
      return false;
    }

    // Bedroom range filter
    if (
      criteria.minBedrooms !== undefined &&
      property.bedrooms < criteria.minBedrooms
    ) {
      return false;
    }
    if (
      criteria.maxBedrooms !== undefined &&
      property.bedrooms > criteria.maxBedrooms
    ) {
      return false;
    }

    // Date added filter (exact match)
    if (
      criteria.dateAdded !== undefined &&
      property.dateAdded !== criteria.dateAdded
    ) {
      return false;
    }

    // Postcode filter (case-insensitive partial match)
    if (criteria.postcode !== undefined && criteria.postcode.trim() !== '') {
      const propertyPostcode = property.postcode.toLowerCase().replace(/\s/g, '');
      const searchPostcode = criteria.postcode.toLowerCase().replace(/\s/g, '');
      if (!propertyPostcode.includes(searchPostcode)) {
        return false;
      }
    }

    // Property passes all specified criteria
    return true;
  });
};

