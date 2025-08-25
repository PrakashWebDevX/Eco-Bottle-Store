import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestCheckoutOption = () => {
  return (
    <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 text-center">
      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="ShoppingBag" size={24} className="text-accent" />
      </div>
      
      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
        Continue as Guest
      </h3>
      
      <p className="font-body text-sm text-muted-foreground mb-6">
        Shop without creating an account. You can always create one later to track orders and save preferences.
      </p>
      
      <Link to="/checkout-process">
        <Button 
          variant="outline" 
          className="w-full"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Guest Checkout
        </Button>
      </Link>
      
      <p className="font-body text-xs text-muted-foreground mt-3">
        Note: Guest orders cannot be tracked or modified after placement
      </p>
    </div>
  );
};

export default GuestCheckoutOption;