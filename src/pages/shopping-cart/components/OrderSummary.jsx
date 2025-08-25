import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSummary = ({ subtotal, discount, shipping, total, onCheckout, isLoading }) => {
  const discountAmount = subtotal * (discount / 100);
  const finalTotal = subtotal - discountAmount + shipping;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4 sticky top-24">
      <h2 className="font-heading font-bold text-xl text-foreground">Order Summary</h2>
      {/* Pricing Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-body text-foreground">Subtotal</span>
          <span className="font-mono font-medium text-foreground">${subtotal?.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-success" />
              <span className="font-body text-success">Launch Discount ({discount}%)</span>
            </div>
            <span className="font-mono font-medium text-success">-${discountAmount?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="font-body text-foreground">Shipping</span>
          <span className="font-mono font-medium text-foreground">
            {shipping === 0 ? 'FREE' : `$${shipping?.toFixed(2)}`}
          </span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-lg text-foreground">Total</span>
            <span className="font-mono font-bold text-xl text-foreground">${finalTotal?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Promotional Messages */}
      <div className="bg-success/10 rounded-lg p-3 space-y-2">
        <div className="flex items-center space-x-2">
          <Icon name="Leaf" size={16} className="text-success" />
          <span className="font-body font-medium text-success">Eco-Friendly Choice</span>
        </div>
        <p className="text-sm text-success/80 font-body">
          Your purchase supports sustainable manufacturing and reduces plastic waste.
        </p>
      </div>
      {shipping === 0 && subtotal >= 50 && (
        <div className="bg-accent/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} className="text-accent" />
            <span className="font-body font-medium text-accent">Free Shipping Unlocked!</span>
          </div>
          <p className="text-sm text-accent/80 font-body mt-1">
            Orders over $50 qualify for free shipping.
          </p>
        </div>
      )}
      {/* Security Badges */}
      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-4 py-2">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs font-body text-muted-foreground">SSL Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-xs font-body text-muted-foreground">256-bit Encryption</span>
          </div>
        </div>

        <Button
          variant="default"
          fullWidth
          onClick={onCheckout}
          loading={isLoading}
          iconName="CreditCard"
          iconPosition="left"
          className="h-12 font-heading font-semibold"
        >
          Proceed to Secure Checkout
        </Button>

        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground font-body">
          <Icon name="RefreshCw" size={12} />
          <span>30-day return policy</span>
          <span>•</span>
          <span>1-year warranty</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;