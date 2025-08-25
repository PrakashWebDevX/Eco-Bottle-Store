import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PromoBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 45,
    seconds: 30
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />
      
      <div className="container mx-auto px-4 py-6 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Main Message */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-full">
              <Icon name="Zap" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-heading font-bold mb-1">
                Launch Special: 10% Off All EcoBottles!
              </h2>
              <p className="text-primary-foreground/90 text-sm lg:text-base">
                Premium stainless steel bottles with 24h cold & 12h hot retention + Free shipping over $50
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-lg px-4 py-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-medium">Ends in:</span>
              <div className="flex items-center gap-1 font-mono font-bold">
                <span>{timeLeft.days}d</span>
                <span>:</span>
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-4 pt-4 border-t border-primary-foreground/20">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Thermometer" size={16} />
              <span>24h Cold Retention</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Flame" size={16} />
              <span>12h Hot Retention</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Leaf" size={16} />
              <span>100% Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={16} />
              <span>Free Shipping $50+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;