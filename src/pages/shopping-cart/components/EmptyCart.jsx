import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmptyCart = () => {
  const benefits = [
    {
      icon: 'Droplets',
      title: 'Superior Hydration',
      description: 'Stay hydrated during intense workouts with our premium bottles'
    },
    {
      icon: 'Thermometer',
      title: 'Temperature Control',
      description: '24 hours cold, 12 hours hot - perfect for any activity'
    },
    {
      icon: 'Leaf',
      title: 'Eco-Friendly',
      description: 'Reduce plastic waste with our sustainable stainless steel design'
    },
    {
      icon: 'Dumbbell',
      title: 'Fitness Ready',
      description: 'Designed specifically for active lifestyles and fitness enthusiasts'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      {/* Empty State Illustration */}
      <div className="relative">
        <div className="w-48 h-48 mx-auto bg-surface rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={80} className="text-muted-foreground" />
        </div>
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
          <Icon name="Leaf" size={24} className="text-accent" />
        </div>
      </div>
      {/* Main Message */}
      <div className="space-y-4">
        <h1 className="font-heading font-bold text-3xl text-foreground">
          Your Cart is Empty
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Start your eco-friendly fitness journey today! Discover our premium stainless steel water bottles 
          designed for active lifestyles with superior temperature retention.
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        {benefits?.map((benefit, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {benefit?.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {benefit?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Product Preview */}
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 bg-surface rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"
              alt="EcoBottle Premium Stainless Steel Water Bottle"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left space-y-4">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-2xl text-foreground">
                EcoBottle Premium Series
              </h3>
              <p className="font-body text-muted-foreground">
                Premium stainless steel construction with double-wall vacuum insulation. 
                Available in 5 stunning colors to match your style.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Thermometer" size={16} className="text-primary" />
                <span className="text-sm font-body text-foreground">24h Cold • 12h Hot</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-primary" />
                <span className="text-sm font-body text-foreground">BPA-Free</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-mono font-bold text-2xl text-foreground">$29.99</span>
              <span className="font-mono text-lg text-muted-foreground line-through">$33.32</span>
              <span className="bg-success text-success-foreground px-2 py-1 rounded-md text-sm font-medium">
                10% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="space-y-4">
        <Link to="/product-catalog-browse">
          <Button
            variant="default"
            size="lg"
            iconName="Store"
            iconPosition="left"
            className="h-12 px-8 font-heading font-semibold"
          >
            Start Shopping Now
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground font-body">
          Free shipping on orders over $50 • 30-day return policy • 1-year warranty
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;