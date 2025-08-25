import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import CrossSellSection from './components/CrossSellSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock cart data
  const mockCartItems = [
    {
      id: 'eco-bottle-1',
      name: 'EcoBottle Premium 32oz',
      price: 29.99,
      quantity: 2,
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop'
    },
    {
      id: 'eco-bottle-2',
      name: 'EcoBottle Premium 24oz',
      price: 26.99,
      quantity: 1,
      color: 'black',
      image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop'
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    const loadCartData = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        // Use mock data for demonstration
        setCartItems(mockCartItems);
        localStorage.setItem('cartItems', JSON.stringify(mockCartItems));
      }
      
      // Update cart count in header
      updateCartCount();
    };

    loadCartData();
  }, []);

  const updateCartCount = () => {
    const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
    localStorage.setItem('cartCount', totalItems?.toString());
    
    // Dispatch custom event to update header
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: totalItems } }));
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedItems = cartItems?.map(item =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateCartCount();
    setIsUpdating(false);
  };

  const handleUpdateColor = async (itemId, newColor) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const updatedItems = cartItems?.map(item =>
      item?.id === itemId ? { ...item, color: newColor } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setIsUpdating(false);
  };

  const handleRemoveItem = async (itemId) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedItems = cartItems?.filter(item => item?.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateCartCount();
    setIsUpdating(false);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    
    // Simulate checkout preparation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    navigate('/checkout-process');
  };

  const handleContinueShopping = () => {
    navigate('/product-catalog-browse');
  };

  // Calculate order totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const launchDiscount = 10; // 10% launch discount
  const shippingThreshold = 50;
  const shipping = subtotal >= shippingThreshold ? 0 : 5.99;

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Shopping Cart - EcoBottle Store</title>
          <meta name="description" content="Review your eco-friendly water bottle selection and proceed to checkout. Free shipping on orders over $50." />
        </Helmet>
        
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <EmptyCart />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shopping Cart ({cartItems?.length} items) - EcoBottle Store</title>
        <meta name="description" content="Review your eco-friendly water bottle selection and proceed to checkout. Free shipping on orders over $50." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="font-heading font-bold text-3xl text-foreground">Shopping Cart</h1>
            <p className="font-body text-muted-foreground">
              {cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={handleContinueShopping}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress Indicator */}
            {subtotal < shippingThreshold && (
              <div className="bg-accent/10 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Truck" size={20} className="text-accent" />
                  <div className="flex-1">
                    <p className="font-body font-medium text-accent">
                      Add ${(shippingThreshold - subtotal)?.toFixed(2)} more for FREE shipping!
                    </p>
                    <div className="w-full bg-accent/20 rounded-full h-2 mt-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(subtotal / shippingThreshold) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <CartItem
                  key={item?.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onUpdateColor={handleUpdateColor}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Mobile Order Summary */}
            <div className="lg:hidden mt-8">
              <OrderSummary
                subtotal={subtotal}
                discount={launchDiscount}
                shipping={shipping}
                total={subtotal - (subtotal * launchDiscount / 100) + shipping}
                onCheckout={handleCheckout}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden lg:block">
            <OrderSummary
              subtotal={subtotal}
              discount={launchDiscount}
              shipping={shipping}
              total={subtotal - (subtotal * launchDiscount / 100) + shipping}
              onCheckout={handleCheckout}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Cross-sell Section */}
        <div className="mt-16">
          <CrossSellSection />
        </div>

        {/* Trust Signals */}
        <div className="mt-12 bg-card rounded-lg border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name="Shield" size={24} className="text-success" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">Secure Checkout</h3>
              <p className="text-sm font-body text-muted-foreground">
                Your payment information is protected with 256-bit SSL encryption
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name="RotateCcw" size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">Easy Returns</h3>
              <p className="text-sm font-body text-muted-foreground">
                30-day hassle-free returns on all products with full refund
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name="Award" size={24} className="text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">Quality Guarantee</h3>
              <p className="text-sm font-body text-muted-foreground">
                1-year warranty on all EcoBottle products with premium support
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Checkout */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-4 z-40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-body text-sm text-muted-foreground">Total</p>
              <p className="font-mono font-bold text-xl text-foreground">
                ${(subtotal - (subtotal * launchDiscount / 100) + shipping)?.toFixed(2)}
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleCheckout}
              loading={isLoading}
              iconName="CreditCard"
              iconPosition="left"
              className="h-12 px-6"
            >
              Checkout
            </Button>
          </div>
        </div>

        {/* Mobile Bottom Spacing */}
        <div className="lg:hidden h-20" />
      </main>
    </div>
  );
};

export default ShoppingCart;