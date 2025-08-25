import React from 'react';
import Icon from '../../../components/AppIcon';

const ColorVariantSelector = ({ colorVariants, selectedColor, onColorSelect }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">Color</h3>
        <span className="text-sm font-body text-muted-foreground">
          {colorVariants?.find(variant => variant?.id === selectedColor)?.name}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colorVariants?.map((variant) => (
          <button
            key={variant?.id}
            onClick={() => onColorSelect(variant?.id)}
            className={`relative w-12 h-12 rounded-full border-2 transition-gentle hover:scale-105 ${
              selectedColor === variant?.id
                ? 'border-primary shadow-organic-md'
                : 'border-border hover:border-primary/50'
            }`}
            style={{ backgroundColor: variant?.colorCode }}
            aria-label={`Select ${variant?.name} color`}
          >
            {selectedColor === variant?.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon 
                  name="Check" 
                  size={20} 
                  color={variant?.colorCode === '#FFFFFF' || variant?.colorCode === '#F5F5F5' ? '#1A2E1A' : '#FFFFFF'} 
                />
              </div>
            )}
            
            {/* Stock indicator */}
            {variant?.stock === 0 && (
              <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
                <Icon name="X" size={16} className="text-error" />
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Stock status for selected color */}
      <div className="text-sm font-body">
        {(() => {
          const selectedVariant = colorVariants?.find(variant => variant?.id === selectedColor);
          if (selectedVariant?.stock === 0) {
            return <span className="text-error">Out of stock</span>;
          } else if (selectedVariant?.stock && selectedVariant?.stock <= 5) {
            return <span className="text-warning">Only {selectedVariant?.stock} left in stock</span>;
          } else {
            return <span className="text-success">In stock</span>;
          }
        })()}
      </div>
    </div>
  );
};

export default ColorVariantSelector;