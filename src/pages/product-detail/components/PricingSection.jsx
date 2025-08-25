import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PricingSection = ({ originalPrice, discountPercentage }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev?.seconds > 0) {
          return { ...prev, seconds: prev?.seconds - 1 };
        } else if (prev?.minutes > 0) {
          return { ...prev, minutes: prev?.minutes - 1, seconds: 59 };
        } else if (prev?.hours > 0) {
          return { hours: prev?.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const discountAmount = originalPrice * (discountPercentage / 100);
  const salePrice = originalPrice - discountAmount;

  return (
    <div className="space-y-4">
      {/* Launch Special Banner */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Zap" size={20} className="text-accent" />
          <span className="font-heading font-semibold text-accent">Launch Special</span>
        </div>
        <p className="text-sm font-body text-foreground">
          Limited time offer - {discountPercentage}% off for early customers!
        </p>
      </div>
      {/* Pricing Display */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-mono font-bold text-primary">
            ${salePrice?.toFixed(2)}
          </span>
          <span className="text-lg font-mono text-muted-foreground line-through">
            ${originalPrice?.toFixed(2)}
          </span>
          <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-sm font-body font-medium">
            Save ${discountAmount?.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm font-body text-muted-foreground">
          <Icon name="Truck" size={16} />
          <span>Free shipping on orders over $50</span>
        </div>
      </div>
      {/* Countdown Timer */}
      <div className="bg-error/10 border border-error/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={18} className="text-error" />
            <span className="font-body font-medium text-error">Offer ends in:</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="bg-error text-error-foreground rounded-lg px-3 py-2 text-center min-w-[60px]">
            <div className="font-mono font-bold text-lg">{timeLeft?.hours?.toString()?.padStart(2, '0')}</div>
            <div className="text-xs font-body">Hours</div>
          </div>
          <div className="bg-error text-error-foreground rounded-lg px-3 py-2 text-center min-w-[60px]">
            <div className="font-mono font-bold text-lg">{timeLeft?.minutes?.toString()?.padStart(2, '0')}</div>
            <div className="text-xs font-body">Minutes</div>
          </div>
          <div className="bg-error text-error-foreground rounded-lg px-3 py-2 text-center min-w-[60px]">
            <div className="font-mono font-bold text-lg">{timeLeft?.seconds?.toString()?.padStart(2, '0')}</div>
            <div className="text-xs font-body">Seconds</div>
          </div>
        </div>
      </div>
      {/* Payment Options */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm font-body text-muted-foreground">
          <Icon name="CreditCard" size={16} />
          <span>Pay in 4 interest-free installments of ${(salePrice / 4)?.toFixed(2)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm font-body text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;