import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuantitySelector = ({ quantity, onQuantityChange, maxQuantity = 10 }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e?.target?.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <label className="font-body font-medium text-foreground">Quantity</label>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="h-10 w-10 rounded-none border-r border-border"
          >
            <Icon name="Minus" size={16} />
          </Button>
          
          <input
            type="number"
            min="1"
            max={maxQuantity}
            value={quantity}
            onChange={handleInputChange}
            className="w-16 h-10 text-center border-none outline-none font-mono font-semibold bg-transparent"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrease}
            disabled={quantity >= maxQuantity}
            className="h-10 w-10 rounded-none border-l border-border"
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
        
        <span className="text-sm font-body text-muted-foreground">
          Max {maxQuantity} per order
        </span>
      </div>

      {/* Bulk pricing info */}
      {quantity >= 3 && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Gift" size={16} className="text-success" />
            <span className="text-sm font-body text-success font-medium">
              Buy 3+ and save an additional 5% on each bottle!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;