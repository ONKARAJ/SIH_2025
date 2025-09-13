'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, MapPin, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface FilterOptions {
  search: string;
  category: string;
  season: string;
  location: string;
  month: string;
}

interface FestivalFiltersProps {
  onFilterChange?: (filters: FilterOptions) => void;
  className?: string;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'tribal', label: 'Tribal Festivals' },
  { value: 'religious', label: 'Religious Festivals' },
  { value: 'harvest', label: 'Harvest Festivals' },
  { value: 'seasonal', label: 'Seasonal Celebrations' },
  { value: 'cultural', label: 'Cultural Events' }
];

const seasons = [
  { value: '', label: 'All Seasons' },
  { value: 'spring', label: 'Spring (Mar-May)' },
  { value: 'summer', label: 'Summer (Jun-Aug)' },
  { value: 'monsoon', label: 'Monsoon (Sep-Oct)' },
  { value: 'winter', label: 'Winter (Nov-Feb)' }
];

const locations = [
  { value: '', label: 'All Locations' },
  { value: 'ranchi', label: 'Ranchi Region' },
  { value: 'hazaribagh', label: 'Hazaribagh Region' },
  { value: 'dumka', label: 'Dumka Region' },
  { value: 'dhanbad', label: 'Dhanbad Region' },
  { value: 'jamshedpur', label: 'Jamshedpur Region' },
  { value: 'deoghar', label: 'Deoghar Region' }
];

const months = [
  { value: '', label: 'All Months' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
];

export default function FestivalFilters({ onFilterChange, className = '' }: FestivalFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    season: '',
    location: '',
    month: ''
  });
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Update active filters for display
  useEffect(() => {
    const active: string[] = [];
    if (filters.search) active.push(`Search: "${filters.search}"`);
    if (filters.category) active.push(`Category: ${categories.find(c => c.value === filters.category)?.label}`);
    if (filters.season) active.push(`Season: ${seasons.find(s => s.value === filters.season)?.label}`);
    if (filters.location) active.push(`Location: ${locations.find(l => l.value === filters.location)?.label}`);
    if (filters.month) active.push(`Month: ${filters.month}`);
    setActiveFilters(active);
  }, [filters]);

  // Notify parent component of filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: '',
      season: '',
      location: '',
      month: ''
    });
  };

  const removeFilter = (filterText: string) => {
    if (filterText.startsWith('Search:')) {
      updateFilter('search', '');
    } else if (filterText.startsWith('Category:')) {
      updateFilter('category', '');
    } else if (filterText.startsWith('Season:')) {
      updateFilter('season', '');
    } else if (filterText.startsWith('Location:')) {
      updateFilter('location', '');
    } else if (filterText.startsWith('Month:')) {
      updateFilter('month', '');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search festivals, traditions, locations..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showAdvanced && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Advanced Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Category
                  </label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Season Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Season
                  </label>
                  <Select value={filters.season} onValueChange={(value) => updateFilter('season', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map((season) => (
                        <SelectItem key={season.value} value={season.value}>
                          {season.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Month Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Month
                  </label>
                  <Select value={filters.month} onValueChange={(value) => updateFilter('month', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
