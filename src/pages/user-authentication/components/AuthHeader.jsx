import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackNavigation}
              className="h-10 w-10"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            
            <Link to="/product-catalog-browse" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Droplets" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">EcoBottle</span>
            </Link>
          </div>

          <Link to="/shopping-cart">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Icon name="ShoppingCart" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;