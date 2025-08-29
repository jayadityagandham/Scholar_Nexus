
import React, { useState } from 'react';
import { Check, ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AccessLevel, ResourceType } from './ResourceCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResourceFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  types: ResourceType[];
  accessLevels: AccessLevel[];
  yearRange: [number, number];
  categories: string[];
  searchQuery: string;
  sortBy: 'relevance' | 'newest' | 'oldest' | 'citations';
}

const ALL_TYPES: ResourceType[] = ['paper', 'book', 'video', 'course'];
const ALL_ACCESS_LEVELS: AccessLevel[] = ['open', 'student', 'faculty', 'restricted'];
const ALL_CATEGORIES = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Engineering',
  'Biology',
  'Chemistry',
  'Social Sciences',
  'Arts & Humanities',
  'Medicine',
  'Economics',
  'Law',
  'Psychology',
];

const ResourceFilters: React.FC<ResourceFiltersProps> = ({ onFilterChange }) => {
  const currentYear = new Date().getFullYear();
  
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    accessLevels: [],
    yearRange: [1950, currentYear],
    categories: [],
    searchQuery: '',
    sortBy: 'relevance',
  });
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const handleTypeChange = (type: ResourceType) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    const updatedFilters = { ...filters, types: updatedTypes };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleAccessChange = (access: AccessLevel) => {
    const updatedAccess = filters.accessLevels.includes(access)
      ? filters.accessLevels.filter(a => a !== access)
      : [...filters.accessLevels, access];
    
    const updatedFilters = { ...filters, accessLevels: updatedAccess };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const updatedFilters = { ...filters, categories: updatedCategories };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleSortChange = (value: string) => {
    const sortBy = value as 'relevance' | 'newest' | 'oldest' | 'citations';
    const updatedFilters = { ...filters, sortBy };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const resetFilters = () => {
    const resetFilters: FilterState = {
      types: [],
      accessLevels: [],
      yearRange: [1950, currentYear],
      categories: [],
      searchQuery: '',
      sortBy: 'relevance',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  // Count total active filters
  const activeFilterCount = 
    filters.types.length + 
    filters.accessLevels.length + 
    filters.categories.length + 
    (filters.searchQuery ? 1 : 0);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border">
      {/* Mobile filter button */}
      <div className="lg:hidden p-4 border-b">
        <Button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          variant="outline"
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {activeFilterCount}
              </span>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      {/* Filter header for desktop */}
      <div className="hidden lg:flex justify-between items-center p-4 border-b">
        <h3 className="font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount}
            </span>
          )}
        </h3>
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-gray-500 text-sm hover:text-gray-700"
          >
            <X className="h-3 w-3 mr-1" />
            Reset all
          </Button>
        )}
      </div>
      
      {/* Filter sections */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block divide-y`}>
        {/* Sort by */}
        <div className="p-4">
          <Label htmlFor="sort-by">Sort by</Label>
          <Select
            value={filters.sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger id="sort-by" className="w-full mt-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="citations">Most cited</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Resource type */}
        <Collapsible defaultOpen className="p-4">
          <CollapsibleTrigger className="flex w-full justify-between items-center text-sm font-medium">
            Resource Type
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {ALL_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.types.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                />
                <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Access Level */}
        <Collapsible defaultOpen className="p-4">
          <CollapsibleTrigger className="flex w-full justify-between items-center text-sm font-medium">
            Access Level
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {ALL_ACCESS_LEVELS.map((access) => (
              <div key={access} className="flex items-center space-x-2">
                <Checkbox
                  id={`access-${access}`}
                  checked={filters.accessLevels.includes(access)}
                  onCheckedChange={() => handleAccessChange(access)}
                />
                <Label htmlFor={`access-${access}`} className="text-sm capitalize">
                  {access} Access
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Categories */}
        <Collapsible className="p-4">
          <CollapsibleTrigger className="flex w-full justify-between items-center text-sm font-medium">
            Subject Areas
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {ALL_CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label
                  htmlFor={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                  className="text-sm"
                >
                  {category}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Clear filters button for mobile */}
        <div className="lg:hidden p-4">
          {activeFilterCount > 0 && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetFilters}
            >
              <X className="h-4 w-4 mr-2" />
              Reset all filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceFilters;
