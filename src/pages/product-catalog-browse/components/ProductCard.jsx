import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ColorSelectionModal from './ColorSelectionModal';

const ProductCard = ({ product, onAddToCart }) => {
  const [showColorModal, setShowColorModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);

  const discountedPrice = product?.price * 0.9; // 10% launch discount
  const savings = product?.price - discountedPrice;

  const handleQuickAdd = () => {
    if (product?.colors?.length > 1) {
      setShowColorModal(true);
    } else {
      onAddToCart(product, product?.colors?.[0]);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onAddToCart(product, color);
    setShowColorModal(false);
  };

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

  return (
    <>
      <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-organic hover:shadow-organic-md transition-all duration-300 hover:-translate-y-1">
        {/* Product Image */}
        <Link to={`/product-detail?id=${product?.id}`} className="block relative overflow-hidden">
          <div className="aspect-square bg-surface/50">
            <Image
              src={getColorImage(selectedColor?.name)}
              alt={`${product?.name} in ${selectedColor?.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product?.isNew && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                New
              </span>
            )}
            <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Icon name="Leaf" size={12} />
              Eco-Friendly
            </span>
          </div>

          {/* Discount Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold">
              10% OFF
            </span>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="default"
              size="icon"
              onClick={(e) => {
                e?.preventDefault();
                handleQuickAdd();
              }}
              className="rounded-full shadow-organic-md"
            >
              <Icon name="Plus" size={18} />
            </Button>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <Link to={`/product-detail?id=${product?.id}`}>
            <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
              {product?.name}
            </h3>
          </Link>

          {/* Color Options */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">Colors:</span>
            <div className="flex gap-1">
              {product?.colors?.slice(0, 4)?.map((color, index) => (
                <button
                  key={color?.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    selectedColor?.name === color?.name 
                      ? 'border-primary scale-110' :'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: color?.hex }}
                  title={color?.name}
                />
              ))}
              {product?.colors?.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{product?.colors?.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Thermometer" size={12} />
              <span>24h Cold</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Droplets" size={12} />
              <span>{product?.capacity}oz</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product?.rating} ({product?.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${discountedPrice?.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${product?.price?.toFixed(2)}
              </span>
            </div>
            <span className="text-xs text-success font-medium">
              Save ${savings?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <ColorSelectionModal
        isOpen={showColorModal}
        onClose={() => setShowColorModal(false)}
        product={product}
        onColorSelect={handleColorSelect}
      />
    </>
  );
};

export default ProductCard;