'use client';

import { useState } from 'react';
import FestivalFilters, { FilterOptions } from './festival-filters';
import FestivalGrid from './festival-grid';

export default function FestivalsWithFilters() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: 'all',
    season: 'all',
    location: 'all',
    month: 'all'
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      season: 'all',
      location: 'all',
      month: 'all'
    });
  };

  return (
    <div className="space-y-8">
      <FestivalFilters onFilterChange={handleFilterChange} filters={filters} />
      <FestivalGrid filters={filters} onClearFilters={handleClearFilters} />
    </div>
  );
}
