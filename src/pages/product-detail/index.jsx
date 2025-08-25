import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import ProductImageGallery from './components/ProductImageGallery';
import ColorVariantSelector from './components/ColorVariantSelector';
import ProductSpecifications from './components/ProductSpecifications';
import PricingSection from './components/PricingSection';
import QuantitySelector from './components/QuantitySelector';
import CustomerReviews from './components/CustomerReviews';
import SocialProofElements from './components/SocialProofElements';
import AddToCartSection from './components/AddToCartSection';

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('midnight-black');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Mock product data
  const productData = {
    id: 'ecobottle-premium-750ml',
    name: 'EcoBottle Premium Stainless Steel Water Bottle',
    shortDescription: 'Premium 750ml stainless steel water bottle with superior temperature retention for active lifestyles',
    originalPrice: 49.99,
    discountPercentage: 10,
    stockLevel: 12,
    averageRating: 4.7,
    totalReviews: 324
  };

  const colorVariants = [
    {
      id: 'midnight-black',
      name: 'Midnight Black',
      colorCode: '#1A1A1A',
      stock: 15,
      images: [
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 'forest-green',
      name: 'Forest Green',
      colorCode: '#2D5A3D',
      stock: 8,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      colorCode: '#1E40AF',
      stock: 12,
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 'sunset-orange',
      name: 'Sunset Orange',
      colorCode: '#EA580C',
      stock: 6,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 'pearl-white',
      name: 'Pearl White',
      colorCode: '#F5F5F5',
      stock: 0,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
      ]
    }
  ];

  const customerReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2025-01-15",
      verified: true,
      comment: `Absolutely love this bottle! The temperature retention is incredible - my coffee stayed hot for over 10 hours during a long hike. The midnight black color looks sleek and professional. Worth every penny!`,
      helpful: 23,
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      date: "2025-01-10",
      verified: true,
      comment: `Great quality bottle with excellent insulation. I use it daily at the gym and it keeps my water ice cold throughout my entire workout. The only minor issue is that it's a bit heavy when full, but that's expected with stainless steel construction.`,
      helpful: 18
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2025-01-08",
      verified: true,
      comment: `Perfect for my daily commute and office use. The forest green color is beautiful and the bottle fits perfectly in my car cup holder. No leaks, easy to clean, and the eco-friendly aspect makes me feel good about my purchase.`,
      helpful: 31
    },
    {
      id: 4,
      name: "David Thompson",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4,
      date: "2025-01-05",
      verified: true,
      comment: `Solid construction and great temperature retention. I've been using it for 3 months now and it still looks brand new. The wide mouth makes it easy to add ice cubes and clean thoroughly.`,
      helpful: 12
    },
    {
      id: 5,
      name: "Lisa Park",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      rating: 5,
      date: "2025-01-02",
      verified: true,
      comment: `This bottle exceeded my expectations! I bought the ocean blue color and it's gorgeous. The 24-hour cold retention claim is accurate - my water was still cold the next morning. Highly recommend!`,
      helpful: 27,
      images: [
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=200&fit=crop"
      ]
    }
  ];

  const recentPurchases = [
    { name: "Alex M.", location: "New York", timeAgo: "2 minutes ago" },
    { name: "Jessica L.", location: "California", timeAgo: "15 minutes ago" },
    { name: "Ryan K.", location: "Texas", timeAgo: "1 hour ago" },
    { name: "Maria S.", location: "Florida", timeAgo: "3 hours ago" }
  ];

  const specifications = {
    capacity: "750ml (25.4 fl oz)",
    material: "18/8 Stainless Steel",
    insulation: "Double-wall vacuum",
    dimensions: "26.7cm H × 7.3cm D",
    weight: "420g (14.8 oz)",
    coldRetention: "24 hours",
    hotRetention: "12 hours"
  };

  const salePrice = productData?.originalPrice * (1 - productData?.discountPercentage / 100);
  const selectedVariant = colorVariants?.find(variant => variant?.id === selectedColor);
  const isInStock = selectedVariant?.stock > 0;

  const handleAddToCart = (cartData) => {
    console.log('Adding to cart:', cartData);
    // Here you would typically dispatch to a cart context or make an API call
  };

  const handleAddToWishlist = (wishlistData) => {
    console.log('Adding to wishlist:', wishlistData);
    // Here you would typically dispatch to a wishlist context or make an API call
  };

  // Add padding bottom for mobile sticky cart
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      document.body.style.paddingBottom = '80px';
    }
    
    return () => {
      document.body.style.paddingBottom = '0';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm font-body text-muted-foreground mb-6">
          <Link to="/product-catalog-browse" className="hover:text-foreground transition-gentle">
            Shop
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">EcoBottle Premium</span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <ProductImageGallery 
              selectedColor={selectedColor}
              colorVariants={colorVariants}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-3">
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                {productData?.name}
              </h1>
              <p className="font-body text-muted-foreground leading-relaxed">
                {productData?.shortDescription}
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={18}
                      className={star <= Math.round(productData?.averageRating) ? 'text-accent fill-current' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="font-mono text-sm text-muted-foreground">
                  {productData?.averageRating} ({productData?.totalReviews} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <PricingSection 
              originalPrice={productData?.originalPrice}
              discountPercentage={productData?.discountPercentage}
            />

            {/* Color Selection */}
            <ColorVariantSelector 
              colorVariants={colorVariants}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />

            {/* Quantity Selection */}
            <QuantitySelector 
              quantity={quantity}
              onQuantityChange={setQuantity}
              maxQuantity={selectedVariant?.stock || 0}
            />

            {/* Add to Cart Section - Desktop */}
            <div className="hidden md:block">
              <AddToCartSection 
                selectedColor={selectedColor}
                quantity={quantity}
                salePrice={salePrice}
                isInStock={isInStock}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="mt-12 space-y-12">
          {/* Social Proof */}
          <SocialProofElements 
            stockLevel={productData?.stockLevel}
            recentPurchases={recentPurchases}
          />

          {/* Product Specifications */}
          <ProductSpecifications specifications={specifications} />

          {/* Customer Reviews */}
          <CustomerReviews 
            reviews={customerReviews}
            averageRating={productData?.averageRating}
            totalReviews={productData?.totalReviews}
          />
        </div>

        {/* Mobile Add to Cart Section */}
        <div className="md:hidden">
          <AddToCartSection 
            selectedColor={selectedColor}
            quantity={quantity}
            salePrice={salePrice}
            isInStock={isInStock}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;