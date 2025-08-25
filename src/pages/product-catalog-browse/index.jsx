import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import PromoBanner from './components/PromoBanner';
import FilterChips from './components/FilterChips';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';

const ProductCatalogBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    colors: [],
    capacities: [],
    priceRange: { min: null, max: null },
    features: []
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "EcoBottle Pro Insulated Water Bottle",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      capacity: "24",
      rating: 4.8,
      reviewCount: 124,
      isNew: true,
      colors: [
        { name: 'Midnight Black', hex: '#1a1a1a' },
        { name: 'Ocean Blue', hex: '#2563eb' },
        { name: 'Forest Green', hex: '#16a34a' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free', 'dishwasher-safe']
    },
    {
      id: 2,
      name: "EcoBottle Classic Stainless Steel",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      capacity: "20",
      rating: 4.6,
      reviewCount: 89,
      isNew: false,
      colors: [
        { name: 'Arctic White', hex: '#ffffff' },
        { name: 'Sunset Orange', hex: '#ea580c' },
        { name: 'Midnight Black', hex: '#1a1a1a' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free']
    },
    {
      id: 3,
      name: "EcoBottle Sport Performance",
      price: 52.99,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop",
      capacity: "32",
      rating: 4.9,
      reviewCount: 156,
      isNew: true,
      colors: [
        { name: 'Forest Green', hex: '#16a34a' },
        { name: 'Ocean Blue', hex: '#2563eb' },
        { name: 'Midnight Black', hex: '#1a1a1a' },
        { name: 'Sunset Orange', hex: '#ea580c' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free', 'dishwasher-safe']
    },
    {
      id: 4,
      name: "EcoBottle Compact Travel",
      price: 28.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      capacity: "16",
      rating: 4.5,
      reviewCount: 67,
      isNew: false,
      colors: [
        { name: 'Arctic White', hex: '#ffffff' },
        { name: 'Ocean Blue', hex: '#2563eb' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free']
    },
    {
      id: 5,
      name: "EcoBottle Elite Premium",
      price: 68.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      capacity: "24",
      rating: 4.9,
      reviewCount: 203,
      isNew: true,
      colors: [
        { name: 'Midnight Black', hex: '#1a1a1a' },
        { name: 'Forest Green', hex: '#16a34a' },
        { name: 'Arctic White', hex: '#ffffff' },
        { name: 'Ocean Blue', hex: '#2563eb' },
        { name: 'Sunset Orange', hex: '#ea580c' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free', 'dishwasher-safe']
    },
    {
      id: 6,
      name: "EcoBottle Adventure Series",
      price: 41.99,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop",
      capacity: "20",
      rating: 4.7,
      reviewCount: 98,
      isNew: false,
      colors: [
        { name: 'Forest Green', hex: '#16a34a' },
        { name: 'Sunset Orange', hex: '#ea580c' },
        { name: 'Midnight Black', hex: '#1a1a1a' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free']
    },
    {
      id: 7,
      name: "EcoBottle Urban Commuter",
      price: 36.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      capacity: "24",
      rating: 4.6,
      reviewCount: 142,
      isNew: false,
      colors: [
        { name: 'Arctic White', hex: '#ffffff' },
        { name: 'Midnight Black', hex: '#1a1a1a' },
        { name: 'Ocean Blue', hex: '#2563eb' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free', 'dishwasher-safe']
    },
    {
      id: 8,
      name: "EcoBottle Fitness Pro",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      capacity: "32",
      rating: 4.8,
      reviewCount: 187,
      isNew: true,
      colors: [
        { name: 'Ocean Blue', hex: '#2563eb' },
        { name: 'Forest Green', hex: '#16a34a' },
        { name: 'Sunset Orange', hex: '#ea580c' }
      ],
      features: ['insulated', 'leak-proof', 'bpa-free']
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, sortBy]);

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Apply color filter
    if (filters?.colors?.length > 0) {
      filtered = filtered?.filter(product =>
        product?.colors?.some(color => filters?.colors?.includes(color?.name))
      );
    }

    // Apply capacity filter
    if (filters?.capacities?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.capacities?.includes(product?.capacity)
      );
    }

    // Apply price range filter
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      filtered = filtered?.filter(product => {
        const discountedPrice = product?.price * 0.9;
        const min = filters?.priceRange?.min || 0;
        const max = filters?.priceRange?.max || 1000;
        return discountedPrice >= min && discountedPrice <= max;
      });
    }

    // Apply features filter
    if (filters?.features?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.features?.every(feature => product?.features?.includes(feature))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => (a?.price * 0.9) - (b?.price * 0.9));
        break;
      case 'price-high':
        filtered?.sort((a, b) => (b?.price * 0.9) - (a?.price * 0.9));
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case 'popularity':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case 'eco-rating':
        filtered?.sort((a, b) => b?.features?.length - a?.features?.length);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (type, value) => {
    const newFilters = { ...filters };
    
    if (type === 'color') {
      newFilters.colors = newFilters?.colors?.filter(c => c !== value);
    } else if (type === 'capacity') {
      newFilters.capacities = newFilters?.capacities?.filter(c => c !== value);
    } else if (type === 'price') {
      newFilters.priceRange = { min: null, max: null };
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      colors: [],
      capacities: [],
      priceRange: { min: null, max: null },
      features: []
    });
  };

  const handleAddToCart = (product, color) => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add new item
    const cartItem = {
      id: `${product?.id}-${color?.name}`,
      productId: product?.id,
      name: product?.name,
      price: product?.price * 0.9, // Apply discount
      originalPrice: product?.price,
      color: color,
      capacity: product?.capacity,
      image: product?.image,
      quantity: 1
    };

    // Check if item already exists
    const existingItemIndex = currentCart?.findIndex(item => item?.id === cartItem?.id);
    
    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart?.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    localStorage.setItem('cartCount', currentCart?.reduce((sum, item) => sum + item?.quantity, 0)?.toString());

    // Show success message (you could implement a toast notification here)
    console.log('Added to cart:', cartItem);
  };

  const activeFilterCount = filters?.colors?.length + filters?.capacities?.length + 
    (filters?.priceRange?.min || filters?.priceRange?.max ? 1 : 0) + filters?.features?.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PromoBanner />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block">
            <FilterPanel
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={handleFilterChange}
              isMobile={false}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2"
              >
                <Icon name="Filter" size={18} />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Desktop Sort & Results */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Eco-Friendly Water Bottles
                </h1>
                <span className="text-muted-foreground">
                  ({filteredProducts?.length} products)
                </span>
              </div>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Mobile Title */}
            <div className="lg:hidden mb-4">
              <h1 className="text-xl font-heading font-bold text-foreground mb-1">
                Eco-Friendly Bottles
              </h1>
              <span className="text-sm text-muted-foreground">
                {filteredProducts?.length} products found
              </span>
            </div>

            {/* Active Filters */}
            <FilterChips
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Product Grid */}
            <div className="mt-6">
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
              />
            </div>

            {/* Load More Button (for infinite scroll simulation) */}
            {!loading && filteredProducts?.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" className="px-8">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        isMobile={true}
      />
    </div>
  );
};

export default ProductCatalogBrowse;