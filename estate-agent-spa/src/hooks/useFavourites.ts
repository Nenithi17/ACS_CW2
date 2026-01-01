import { useState, useEffect } from 'react';
import type { Property } from '../types/Property';

/**
 * Custom hook for managing favourites with localStorage persistence
 * Provides methods to add, remove, clear, and check favourites
 */
export const useFavourites = () => {
  const [favourites, setFavourites] = useState<Property[]>([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('favourites');
    if (stored) {
      try {
        setFavourites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favourites from localStorage:', error);
      }
    }
  }, []);

  // Save favourites to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  /**
   * Add a property to favourites
   * Prevents duplicates by checking if property id already exists
   */
  const addFavourite = (property: Property): void => {
    setFavourites((prev) => {
      // Check if property is already in favourites
      if (prev.some((fav) => fav.id === property.id)) {
        return prev; // Return unchanged if already exists
      }
      return [...prev, property];
    });
  };

  /**
   * Remove a property from favourites by id
   */
  const removeFavourite = (propertyId: number): void => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  };

  /**
   * Clear all favourites
   */
  const clearFavourites = (): void => {
    setFavourites([]);
  };

  /**
   * Check if a property is in favourites
   */
  const isFavourite = (propertyId: number): boolean => {
    return favourites.some((fav) => fav.id === propertyId);
  };

  return {
    favourites,
    addFavourite,
    removeFavourite,
    clearFavourites,
    isFavourite,
  };
};

