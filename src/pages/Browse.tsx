
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Filter, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourceCard, { ResourceProps } from '@/components/ResourceCard';
import ResourceFilters, { FilterState } from '@/components/ResourceFilters';
import { getResources } from '@/services/resourceService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<ResourceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    accessLevels: [],
    yearRange: [1950, new Date().getFullYear()],
    categories: [],
    searchQuery: '',
    sortBy: 'relevance',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Initialize filters from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');
    
    const initialFilters: FilterState = { ...filters };
    
    if (typeParam) {
      initialFilters.types = [typeParam as any];
    }
    
    if (categoryParam) {
      initialFilters.categories = [categoryParam];
    }
    
    if (queryParam) {
      initialFilters.searchQuery = queryParam;
      setSearchValue(queryParam);
    }
    
    setFilters(initialFilters);
  }, []);

  // Load resources when filters change
  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const fetchedResources = await getResources(filters);
        setResources(fetchedResources);
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadResources();
    
    // Update URL params
    const params = new URLSearchParams();
    
    if (filters.types.length === 1) {
      params.set('type', filters.types[0]);
    }
    
    if (filters.categories.length === 1) {
      params.set('category', filters.categories[0]);
    }
    
    if (filters.searchQuery) {
      params.set('q', filters.searchQuery);
    }
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery: searchValue }));
  };

  const clearSearch = () => {
    setSearchValue('');
    setFilters(prev => ({ ...prev, searchQuery: '' }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-b from-academy-50 to-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Resources</h1>
            <p className="text-gray-600 mb-6">
              Explore our collection of academic papers, books, courses, and more
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <Input
                type="text"
                placeholder="Search by title, author, or keywords..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pr-20"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-[70px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <Button
                type="submit"
                className="absolute right-0 top-0 rounded-l-none h-full"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex justify-between"
            >
              <span className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </span>
              <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                {filters.types.length + filters.accessLevels.length + filters.categories.length} active
              </span>
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
              <ResourceFilters onFilterChange={handleFilterChange} />
            </div>
            
            {/* Resources list */}
            <div className="lg:w-3/4">
              {/* Results stats */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {loading ? 'Loading resources...' : `Showing ${resources.length} resources`}
                </p>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-6 border rounded-lg animate-pulse h-48">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-20 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : resources.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {resources.map((resource) => (
                    <ResourceCard key={resource.id} {...resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any resources matching your criteria. Try adjusting your filters or search term.
                  </p>
                  <Button onClick={() => {
                    setFilters({
                      types: [],
                      accessLevels: [],
                      yearRange: [1950, new Date().getFullYear()],
                      categories: [],
                      searchQuery: '',
                      sortBy: 'relevance',
                    });
                    setSearchValue('');
                  }}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
