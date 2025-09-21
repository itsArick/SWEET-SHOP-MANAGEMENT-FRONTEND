import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid as GridIcon, List } from 'lucide-react';
import { useSweets } from '../../hooks/useSweets';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
// import { SweetCard } from '../components/sweets';
import { SweetCard } from '../../components/sweets';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Grid } from '../../components/layout';
import Modal from '../../components/common/Modal';

// Sweet categories constant
const SWEET_CATEGORIES = {
  CHOCOLATE: 'chocolate',
  CANDY: 'candy',
  CAKE: 'cake',
  COOKIE: 'cookie',
  ICE_CREAM: 'ice-cream',
  GUMMY: 'gummy',
  OTHER: 'other'
};

const SweetsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  });

  const { sweets, pagination, fetchSweets, searchSweets } = useSweets();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSweets();
  }, [searchParams]);

  const loadSweets = async () => {
    setLoading(true);
    const params = Object.fromEntries(searchParams);
    const result = filters.search || Object.keys(params).length > 0
      ? await searchSweets(params)
      : await fetchSweets(params);
    
    if (result.success) {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    setSearchParams({});
  };

  const categories = Object.values(SWEET_CATEGORIES);

  return (
    <div>
      <PageHeader
        title="Browse Sweets"
        subtitle="Discover our delicious collection of handcrafted treats"
        breadcrumbs={[
          { label: 'Browse Sweets' }
        ]}
      />

      {/* Search and Filters Bar */}
      <Card className="mb-6 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Input
                placeholder="Search for sweets..."
                icon={Search}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    applyFilters();
                  }
                }}
              />
            </div>
          </div>

          {/* Quick Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={!filters.category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => {
                handleFilterChange('category', '');
                applyFilters();
              }}
            >
              All
            </Button>
            {categories.slice(0, 4).map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  handleFilterChange('category', category);
                  applyFilters();
                }}
                className="whitespace-nowrap capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={SlidersHorizontal}
              onClick={() => setShowFilters(true)}
            >
              Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={viewMode === 'grid' ? List : GridIcon}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            />
          </div>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.category || filters.minPrice || filters.maxPrice) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.search && (
              <span className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                Search: {filters.search}
              </span>
            )}
            {filters.category && (
              <span className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full capitalize">
                {filters.category}
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        )}
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Loading sweets..." />
        </div>
      ) : sweets.length > 0 ? (
        <>
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {pagination.total} sweet{pagination.total !== 1 ? 's' : ''} found
            </p>
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleFilterChange('sortBy', sortBy);
                handleFilterChange('sortOrder', sortOrder);
                applyFilters();
              }}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
            </select>
          </div>

          {/* Sweets Grid/List */}
          <Grid cols={viewMode === 'grid' ? 'auto' : 1} gap={6}>
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onView={(sweet) => navigate(`/sweets/${sweet._id}`)}
              />
            ))}
          </Grid>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {Array.from({ length: pagination.pages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={pagination.page === i + 1 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set('page', i + 1);
                      setSearchParams(newParams);
                    }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No sweets found"
          description="Try adjusting your search criteria or browse our categories."
          actionLabel="Clear Filters"
          onAction={clearFilters}
        />
      )}

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filter Sweets"
        size="lg"
      >
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Price"
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <Input
              label="Max Price"
              type="number"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="createdAt">Date Added</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={clearFilters} className="flex-1">
              Clear All
            </Button>
            <Button variant="primary" onClick={applyFilters} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SweetsPage;