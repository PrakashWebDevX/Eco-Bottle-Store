import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SocialProofElements = ({ stockLevel, recentPurchases }) => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (recentPurchases?.length > 0) {
      const interval = setInterval(() => {
        setShowNotification(false);
        setTimeout(() => {
          setCurrentNotification(prev => (prev + 1) % recentPurchases?.length);
          setShowNotification(true);
        }, 300);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [recentPurchases?.length]);

  const getStockLevelColor = () => {
    if (stockLevel <= 5) return 'text-error';
    if (stockLevel <= 15) return 'text-warning';
    return 'text-success';
  };

  const getStockLevelMessage = () => {
    if (stockLevel <= 5) return `Only ${stockLevel} left in stock!`;
    if (stockLevel <= 15) return `${stockLevel} items remaining`;
    return `${stockLevel}+ in stock`;
  };

  return (
    <div className="space-y-4">
      {/* Stock Level Indicator */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={20} className={getStockLevelColor()} />
            <span className="font-body font-medium text-foreground">Stock Level</span>
          </div>
          <span className={`font-mono font-semibold ${getStockLevelColor()}`}>
            {getStockLevelMessage()}
          </span>
        </div>
        
        {/* Stock Level Bar */}
        <div className="mt-3">
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                stockLevel <= 5 ? 'bg-error' : stockLevel <= 15 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min((stockLevel / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
      {/* Recent Purchase Notifications */}
      {recentPurchases?.length > 0 && (
        <div className={`bg-accent/10 border border-accent/20 rounded-lg p-4 transition-all duration-300 ${
          showNotification ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="ShoppingBag" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="font-body text-sm text-foreground">
                <span className="font-medium">{recentPurchases?.[currentNotification]?.name}</span> from{' '}
                <span className="font-medium">{recentPurchases?.[currentNotification]?.location}</span> purchased this item{' '}
                <span className="font-medium">{recentPurchases?.[currentNotification]?.timeAgo}</span>
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {recentPurchases?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentNotification ? 'bg-accent' : 'bg-accent/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
          <p className="text-sm font-body font-medium text-foreground">Secure Checkout</p>
          <p className="text-xs text-muted-foreground">SSL Protected</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <Icon name="Truck" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-sm font-body font-medium text-foreground">Fast Shipping</p>
          <p className="text-xs text-muted-foreground">2-3 Business Days</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <Icon name="RotateCcw" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-sm font-body font-medium text-foreground">Easy Returns</p>
          <p className="text-xs text-muted-foreground">30-Day Policy</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <Icon name="Award" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-sm font-body font-medium text-foreground">Quality Guarantee</p>
          <p className="text-xs text-muted-foreground">Premium Materials</p>
        </div>
      </div>
      {/* Eco-Friendly Certifications */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Leaf" size={20} className="text-success" />
          <h3 className="font-body font-medium text-success">Eco-Friendly Certifications</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-body text-foreground">BPA-Free Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-body text-foreground">Recyclable Materials</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-body text-foreground">Carbon Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-body text-foreground">Sustainable Packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofElements;