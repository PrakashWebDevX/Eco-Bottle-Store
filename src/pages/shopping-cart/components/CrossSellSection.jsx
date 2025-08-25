import React from 'react';

import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CrossSellSection = () => {
  const recommendations = [
    {
      id: 'bottle-brush',
      name: 'Premium Bottle Cleaning Brush',
      price: 12.99,
      originalPrice: 15.99,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
      description: 'Deep clean your bottle with our eco-friendly bamboo brush',
      features: ['Bamboo handle', 'Flexible bristles', 'Dishwasher safe'],
      badge: '19% OFF'
    },
    {
      id: 'bottle-sleeve',
      name: 'Neoprene Bottle Sleeve',
      price: 18.99,
      originalPrice: 22.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      description: 'Extra protection and grip for your workouts',
      features: ['Shock resistant', 'Non-slip grip', 'Multiple colors'],
      badge: '17% OFF'
    },
    {
      id: 'carabiner-clip',
      name: 'Stainless Steel Carabiner',
      price: 8.99,
      originalPrice: 11.99,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      description: 'Attach your bottle to gym bags and backpacks',
      features: ['Aircraft grade', 'Rust resistant', 'Easy attachment'],
      badge: '25% OFF'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-heading font-bold text-2xl text-foreground">
          Complete Your Fitness Setup
        </h2>
        <p className="font-body text-muted-foreground">
          Essential accessories to maximize your EcoBottle experience
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations?.map((item) => (
          <div key={item?.id} className="bg-card rounded-lg border border-border overflow-hidden group hover:shadow-organic-md transition-all duration-300">
            <div className="relative">
              <div className="w-full h-48 bg-surface overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {item?.badge && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
                  {item?.badge}
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2">
                  {item?.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground line-clamp-2">
                  {item?.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-lg text-foreground">
                    ${item?.price}
                  </span>
                  {item?.originalPrice && (
                    <span className="font-mono text-sm text-muted-foreground line-through">
                      ${item?.originalPrice}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  {item?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={12} className="text-success" />
                      <span className="text-xs font-body text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                className="mt-4"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/5 rounded-lg p-6 text-center">
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Package" size={20} className="text-primary" />
            <span className="font-heading font-semibold text-lg text-primary">Bundle & Save</span>
          </div>
          <p className="font-body text-muted-foreground">
            Add any 2 accessories and get an additional 5% off your entire order
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm font-body text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={14} />
              <span>Free shipping</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Icon name="RotateCcw" size={14} />
              <span>Easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSellSection;