import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ orderData, isSticky = false }) => {
  const { items, subtotal, discount, shipping, tax, total } = orderData;

  const colorNames = {
    'midnight-black': 'Midnight Black',
    'ocean-blue': 'Ocean Blue',
    'forest-green': 'Forest Green',
    'sunset-orange': 'Sunset Orange',
    'arctic-white': 'Arctic White'
  };

  return (
    <div className={`bg-card rounded-lg shadow-organic p-6 ${isSticky ? 'sticky top-24' : ''}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="ShoppingBag" size={20} className="text-primary" />
        <h2 className="text-xl font-heading font-bold text-foreground">Order Summary</h2>
      </div>
      <div className="space-y-4 mb-6">
        {items?.map((item) => (
          <div key={`${item?.id}-${item?.color}`} className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={item?.image}
                alt={`${item?.name} in ${colorNames?.[item?.color]}`}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {item?.quantity}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-body font-medium text-foreground">{item?.name}</h3>
              <p className="text-sm text-muted-foreground">Color: {colorNames?.[item?.color]}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-mono text-foreground">${item?.price}</span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-sm font-mono text-muted-foreground line-through">
                    ${item?.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span className="font-body text-muted-foreground">Subtotal</span>
          <span className="font-mono text-foreground">${subtotal?.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="font-body text-success flex items-center space-x-1">
              <Icon name="Tag" size={14} />
              <span>Launch Discount (10%)</span>
            </span>
            <span className="font-mono text-success">-${discount?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="font-body text-muted-foreground">Shipping</span>
          <span className="font-mono text-foreground">
            {shipping === 0 ? 'FREE' : `$${shipping?.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="font-body text-muted-foreground">Tax</span>
          <span className="font-mono text-foreground">${tax?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-lg font-semibold border-t border-border pt-3">
          <span className="font-heading text-foreground">Total</span>
          <span className="font-mono text-foreground">${total?.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Leaf" size={16} className="text-success" />
          <span className="font-body">Eco-friendly packaging included</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Thermometer" size={16} className="text-primary" />
          <span className="font-body">24h cold / 12h hot retention</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Award" size={16} className="text-accent" />
          <span className="font-body">Premium stainless steel construction</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;