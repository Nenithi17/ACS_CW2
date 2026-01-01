/**
 * Property type definition
 * Represents an estate property with all required fields
 */
export interface Property {
  id: number;
  type: 'house' | 'flat';
  price: number;
  bedrooms: number;
  dateAdded: string; // YYYY-MM-DD format
  postcode: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  floorPlan: string;
  latitude: number;
  longitude: number;
}

/**
 * Search criteria interface
 * Used for filtering properties based on user input
 */
export interface SearchCriteria {
  type?: 'house' | 'flat';
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  dateAdded?: string; // YYYY-MM-DD format
  postcode?: string;
}

