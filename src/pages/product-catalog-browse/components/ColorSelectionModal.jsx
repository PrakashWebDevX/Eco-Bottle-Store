import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ColorSelectionModal = ({ isOpen, onClose, product, onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);

  if (!isOpen || !product) return null;

  const getColorImage = (colorName) => {
    const colorImages = {
      'Midnight Black': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
      'Ocean Blue': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      'Forest Green': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      'Sunset Orange': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
      'Arctic White': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
    };
    return colorImages?.[colorName] || product?.image;
  };

  const discountedPrice = product?.price * 0.9;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-heading font-semibold">Select Color</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Product Preview */}
        <div className="p-4">
          <div className="aspect-square bg-surface/50 rounded-lg overflow-hidden mb-4">
            <Image
              src={getColorImage(selectedColor?.name)}
              alt={`${product?.name} in ${selectedColor?.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          <h4 className="font-heading font-semibold text-foreground mb-2">
            {product?.name}
          </h4>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-foreground">
              ${discountedPrice?.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${product?.price?.toFixed(2)}
            </span>
            <span className="bg-error text-error-foreground px-2 py-0.5 rounded text-xs font-medium">
              10% OFF
            </span>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <h5 className="font-medium text-foreground">Available Colors:</h5>
            <div className="grid grid-cols-1 gap-2">
              {product?.colors?.map((color) => (
                <button
                  key={color?.name}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    selectedColor?.name === color?.name
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full border border-border"
                    style={{ backgroundColor: color?.hex }}
                  />
                  <span className="font-medium text-foreground">{color?.name}</span>
                  {selectedColor?.name === color?.name && (
                    <Icon name="Check" size={16} className="text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-4 p-3 bg-surface/50 rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Thermometer" size={16} className="text-primary" />
                <span>24h Cold Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Flame" size={16} className="text-primary" />
                <span>12h Hot Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>Leak Proof</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Leaf" size={16} className="text-success" />
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={() => onColorSelect(selectedColor)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSelectionModal;