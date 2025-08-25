import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CheckoutHeader = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/product-catalog-browse" className="flex items-center space-x-2 transition-gentle hover:opacity-80">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Droplets" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">EcoBottle</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="font-body">Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="font-body">SSL Protected</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;