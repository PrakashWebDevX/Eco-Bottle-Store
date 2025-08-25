import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'eco-rating', label: 'Eco Rating' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  return (
    <div className="w-48">
      <Select
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
        placeholder="Sort by"
        className="text-sm"
      />
    </div>
  );
};

export default SortDropdown;