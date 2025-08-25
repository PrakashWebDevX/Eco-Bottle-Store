import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onUpdateColor, onRemove }) => {
  const [selectedColor, setSelectedColor] = useState(item?.color);
  const [isRemoving, setIsRemoving] = useState(false);

  const colorOptions = [
    { name: 'Midnight Black', value: 'black', hex: '#1a1a1a' },
    { name: 'Ocean Blue', value: 'blue', hex: '#2563eb' },
    { name: 'Forest Green', value: 'green', hex: '#16a34a' },
    { name: 'Sunset Orange', value: 'orange', hex: '#ea580c' },
    { name: 'Rose Gold', value: 'rose', hex: '#e11d48' }
  ];

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
    onUpdateColor(item?.id, newColor);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item?.id);
    }, 300);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, item?.quantity + change);
    onUpdateQuantity(item?.id, newQuantity);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-4 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-surface">
            <Image
              src={item?.image}
              alt={`${item?.name} in ${selectedColor}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">{item?.name}</h3>
              <p className="text-sm text-muted-foreground font-body">
                Premium stainless steel • 24h cold, 12h hot
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading font-bold text-lg text-foreground">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                ${item?.price?.toFixed(2)} each
              </p>
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground font-body">Color:</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions?.map((color) => (
                <button
                  key={color?.value}
                  onClick={() => handleColorChange(color?.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color?.value
                      ? 'border-primary scale-110 shadow-organic'
                      : 'border-border hover:border-primary/50 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color?.hex }}
                  title={color?.name}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-body">
              {colorOptions?.find(c => c?.value === selectedColor)?.name}
            </p>
          </div>

          {/* Quantity and Remove Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground font-body">Quantity:</span>
              <div className="flex items-center bg-surface rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={item?.quantity <= 1}
                  className="h-8 w-8 rounded-l-lg"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="px-3 py-1 font-mono font-medium text-foreground min-w-[2rem] text-center">
                  {item?.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-8 w-8 rounded-r-lg"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-error hover:bg-error/10"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;