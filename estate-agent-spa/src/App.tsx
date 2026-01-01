import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Property, SearchCriteria } from './types/Property';
import propertiesData from './data/properties.json';
import { SearchForm } from './components/SearchForm';
import { PropertyList } from './components/PropertyList';
import { PropertyPage } from './components/PropertyPage';
import { FavouritesPanel } from './components/FavouritesPanel';
import { filterProperties } from './utils/filterProperties';
import { useFavourites } from './hooks/useFavourites';
import './App.css';

/**
 * SearchPage component
 * Main search page with form, results, and favourites panel
 */
const SearchPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});
  const { addFavourite } = useFavourites();
  const allProperties = propertiesData as Property[];

  // Filter properties based on search criteria
  const filteredProperties = filterProperties(allProperties, searchCriteria);

  /**
   * Handle search form submission
   */
  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
  };

  /**
   * Handle drop event in the main content area
   * This allows dragging from favourites panel back to search results
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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Estate Agent</h1>
        <p className="app-subtitle">Find your perfect property</p>
      </header>

      <div className="app-content">
        <main className="app-main" onDrop={handleDrop} onDragOver={handleDragOver}>
          <SearchForm onSearch={handleSearch} />
          <PropertyList properties={filteredProperties} />
        </main>

        <aside className="app-sidebar">
          <FavouritesPanel />
        </aside>
      </div>
    </div>
  );
};

/**
 * Main App component
 * Sets up routing for the application
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
