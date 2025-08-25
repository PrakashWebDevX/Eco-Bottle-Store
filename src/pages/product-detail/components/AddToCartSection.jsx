import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AddToCartSection = ({ 
  selectedColor, 
  quantity, 
  salePrice, 
  isInStock, 
  onAddToCart,
  onAddToWishlist 
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isInStock) return;
    
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAddToCart({
      selectedColor,
      quantity,
      price: salePrice
    });
    
    setIsAddingToCart(false);
    
    // Update cart count in localStorage
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
    localStorage.setItem('cartCount', (currentCount + quantity)?.toString());
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate('/checkout-process');
    }, 500);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist({
      selectedColor,
      price: salePrice
    });
    setIsAddedToWishlist(!isAddedToWishlist);
  };

  const totalPrice = salePrice * quantity;

  return (
    <div className="space-y-4">
      {/* Price Summary */}
      <div className="bg-surface rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-muted-foreground">Unit Price:</span>
          <span className="font-mono font-semibold text-foreground">${salePrice?.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-muted-foreground">Quantity:</span>
          <span className="font-mono font-semibold text-foreground">{quantity}</span>
        </div>
        <div className="border-t border-border pt-2">
          <div className="flex items-center justify-between">
            <span className="font-body font-medium text-foreground">Total:</span>
            <span className="font-mono font-bold text-xl text-primary">${totalPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={!isInStock}
          loading={isAddingToCart}
          iconName="ShoppingCart"
          iconPosition="left"
          className="h-12"
        >
          {!isInStock ? 'Out of Stock' : isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
        </Button>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleBuyNow}
          disabled={!isInStock}
          iconName="Zap"
          iconPosition="left"
          className="h-12"
        >
          Buy Now
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleAddToWishlist}
            iconName={isAddedToWishlist ? "Heart" : "Heart"}
            iconPosition="left"
            className={`h-12 ${isAddedToWishlist ? 'text-error border-error' : ''}`}
          >
            {isAddedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'EcoBottle - Premium Stainless Steel Water Bottle',
                  text: 'Check out this amazing eco-friendly water bottle!',
                  url: window.location?.href
                });
              }
            }}
          >
            <Icon name="Share2" size={20} />
          </Button>
        </div>
      </div>
      {/* Additional Info */}
      <div className="space-y-2 text-sm font-body text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={16} />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="RotateCcw" size={16} />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} />
          <span>2-year warranty included</span>
        </div>
      </div>
      {/* Mobile Sticky Bottom (Hidden on Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:hidden z-40">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddToWishlist}
            className={`h-12 w-12 ${isAddedToWishlist ? 'text-error border-error' : ''}`}
          >
            <Icon name="Heart" size={20} />
          </Button>
          
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            disabled={!isInStock}
            loading={isAddingToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="h-12"
          >
            {!isInStock ? 'Out of Stock' : `Add to Cart - $${totalPrice?.toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSection;