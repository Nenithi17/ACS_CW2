import { useState } from 'react';
import Select from 'react-select';
import type { SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { SearchCriteria } from '../types/Property';

/**
 * Option type for react-select components
 */
interface SelectOption {
  value: string | number;
  label: string;
}

/**
 * Props for SearchForm component
 */
interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

/**
 * SearchForm component
 * Uses React widgets (react-select, react-datepicker) for all form inputs
 * Handles property type, price range, bedrooms, date added, and postcode
 */
export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [type, setType] = useState<SingleValue<SelectOption>>(null);
  const [minPrice, setMinPrice] = useState<SingleValue<SelectOption>>(null);
  const [maxPrice, setMaxPrice] = useState<SingleValue<SelectOption>>(null);
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [maxBedrooms, setMaxBedrooms] = useState<number>(10);
  const [dateAdded, setDateAdded] = useState<Date | null>(null);
  const [postcode, setPostcode] = useState<SingleValue<SelectOption>>(null);

  // Property type options
  const typeOptions: SelectOption[] = [
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' },
  ];

  // Price options (in thousands)
  const priceOptions: SelectOption[] = [
    { value: 0, label: 'Rs. 0' },
    { value: 100000, label: 'Rs. 100,000' },
    { value: 150000, label: 'Rs. 150,000' },
    { value: 200000, label: 'Rs. 200,000' },
    { value: 250000, label: 'Rs. 250,000' },
    { value: 300000, label: 'Rs. 300,000' },
    { value: 350000, label: 'Rs. 350,000' },
    { value: 400000, label: 'Rs. 400,000' },
    { value: 450000, label: 'Rs. 450,000' },
    { value: 500000, label: 'Rs. 500,000' },
    { value: 550000, label: 'Rs. 550,000' },
    { value: 600000, label: 'Rs. 600,000' },
    { value: 650000, label: 'Rs. 650,000' },
  ];

  // Postcode options (from properties data)
  const postcodeOptions: SelectOption[] = [
    { value: 'SW1A 1AA', label: 'SW1A 1AA' },
    { value: 'NW1 6XE', label: 'NW1 6XE' },
    { value: 'W11 3BQ', label: 'W11 3BQ' },
    { value: 'E1 6AN', label: 'E1 6AN' },
    { value: 'SE1 9RT', label: 'SE1 9RT' },
    { value: 'N1 9GU', label: 'N1 9GU' },
    { value: 'SW3 4RB', label: 'SW3 4RB' },
  ];

  /**
   * Handle form submission
   * Builds SearchCriteria object from form state
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const criteria: SearchCriteria = {};

    // Add criteria only if they have values
    if (type) {
      criteria.type = type.value as 'house' | 'flat';
    }

    if (minPrice) {
      criteria.minPrice = minPrice.value as number;
    }

    if (maxPrice) {
      criteria.maxPrice = maxPrice.value as number;
    }

    if (minBedrooms > 0) {
      criteria.minBedrooms = minBedrooms;
    }

    if (maxBedrooms < 10) {
      criteria.maxBedrooms = maxBedrooms;
    }

    if (dateAdded) {
      // Format date as YYYY-MM-DD
      const year = dateAdded.getFullYear();
      const month = String(dateAdded.getMonth() + 1).padStart(2, '0');
      const day = String(dateAdded.getDate()).padStart(2, '0');
      criteria.dateAdded = `${year}-${month}-${day}`;
    }

    if (postcode) {
      criteria.postcode = postcode.value as string;
    }

    onSearch(criteria);
  };

  /**
   * Reset form to initial state
   */
  const handleReset = () => {
    setType(null);
    setMinPrice(null);
    setMaxPrice(null);
    setMinBedrooms(0);
    setMaxBedrooms(10);
    setDateAdded(null);
    setPostcode(null);
    onSearch({});
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <Select
            id="type"
            options={typeOptions}
            value={type}
            onChange={setType}
            isClearable
            placeholder="Select type..."
            classNamePrefix="react-select"
          />
        </div>

        <div className="form-group">
          <label htmlFor="postcode">Postcode</label>
          <Select
            id="postcode"
            options={postcodeOptions}
            value={postcode}
            onChange={setPostcode}
            isClearable
            placeholder="Select postcode..."
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minPrice">Min Price</label>
          <Select
            id="minPrice"
            options={priceOptions}
            value={minPrice}
            onChange={setMinPrice}
            isClearable
            placeholder="Select min price..."
            classNamePrefix="react-select"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice">Max Price</label>
          <Select
            id="maxPrice"
            options={priceOptions}
            value={maxPrice}
            onChange={setMaxPrice}
            isClearable
            placeholder="Select max price..."
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minBedrooms">
            Min Bedrooms: {minBedrooms}
          </label>
          <input
            id="minBedrooms"
            type="range"
            min="0"
            max="10"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxBedrooms">
            Max Bedrooms: {maxBedrooms}
          </label>
          <input
            id="maxBedrooms"
            type="range"
            min="0"
            max="10"
            value={maxBedrooms}
            onChange={(e) => setMaxBedrooms(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateAdded">Date Added</label>
          <DatePicker
            id="dateAdded"
            selected={dateAdded}
            onChange={(date: Date | null) => setDateAdded(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date..."
            isClearable
            className="date-picker-input"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button type="button" onClick={handleReset} className="btn btn-secondary">
          Reset
        </button>
      </div>
    </form>
  );
};

