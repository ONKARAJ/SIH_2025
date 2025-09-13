'use client';

import { useState } from 'react';
import FestivalFilters, { FilterOptions } from './festival-filters';
import FestivalGrid from './festival-grid';

export default function FestivalsWithFilters() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    season: '',
    location: '',
    month: ''
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-8">
      <FestivalFilters onFilterChange={handleFilterChange} />
      <FestivalGrid filters={filters} />
    </div>
  );
}
