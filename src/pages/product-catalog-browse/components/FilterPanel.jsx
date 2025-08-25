import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    color: true,
    capacity: true,
    price: true,
    features: true
  });

  const colors = [
    { name: 'Midnight Black', hex: '#1a1a1a', count: 12 },
    { name: 'Ocean Blue', hex: '#2563eb', count: 8 },
    { name: 'Forest Green', hex: '#16a34a', count: 15 },
    { name: 'Sunset Orange', hex: '#ea580c', count: 6 },
    { name: 'Arctic White', hex: '#ffffff', count: 10 }
  ];

  const capacities = [
    { value: '16', label: '16oz', count: 8 },
    { value: '20', label: '20oz', count: 12 },
    { value: '24', label: '24oz', count: 15 },
    { value: '32', label: '32oz', count: 10 }
  ];

  const features = [
    { value: 'insulated', label: 'Double Wall Insulated', count: 35 },
    { value: 'leak-proof', label: 'Leak Proof', count: 42 },
    { value: 'bpa-free', label: 'BPA Free', count: 51 },
    { value: 'dishwasher-safe', label: 'Dishwasher Safe', count: 28 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleColorChange = (colorName, checked) => {
    const newColors = checked 
      ? [...filters?.colors, colorName]
      : filters?.colors?.filter(c => c !== colorName);
    onFilterChange({ ...filters, colors: newColors });
  };

  const handleCapacityChange = (capacity, checked) => {
    const newCapacities = checked
      ? [...filters?.capacities, capacity]
      : filters?.capacities?.filter(c => c !== capacity);
    onFilterChange({ ...filters, capacities: newCapacities });
  };

  const handleFeatureChange = (feature, checked) => {
    const newFeatures = checked
      ? [...filters?.features, feature]
      : filters?.features?.filter(f => f !== feature);
    onFilterChange({ ...filters, features: newFeatures });
  };

  const handlePriceChange = (type, value) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters?.priceRange,
        [type]: value ? parseInt(value) : null
      }
    });
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-border last:border-b-0">
      <Button
        variant="ghost"
        className="w-full justify-between p-4 h-auto font-medium text-left"
        onClick={() => toggleSection(section)}
      >
        <span>{title}</span>
        <Icon 
          name={expandedSections?.[section] ? "ChevronUp" : "ChevronDown"} 
          size={20} 
        />
      </Button>
      {expandedSections?.[section] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const panelContent = (
    <div className="bg-card">
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>
      )}

      <FilterSection title="Color" section="color">
        <div className="space-y-3">
          {colors?.map((color) => (
            <div key={color?.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={filters?.colors?.includes(color?.name)}
                  onChange={(e) => handleColorChange(color?.name, e?.target?.checked)}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color?.hex }}
                />
                <span className="text-sm font-body">{color?.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">({color?.count})</span>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Capacity" section="capacity">
        <div className="space-y-3">
          {capacities?.map((capacity) => (
            <div key={capacity?.value} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={filters?.capacities?.includes(capacity?.value)}
                  onChange={(e) => handleCapacityChange(capacity?.value, e?.target?.checked)}
                />
                <span className="text-sm font-body">{capacity?.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">({capacity?.count})</span>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.priceRange?.min || ''}
              onChange={(e) => handlePriceChange('min', e?.target?.value)}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters?.priceRange?.max || ''}
              onChange={(e) => handlePriceChange('max', e?.target?.value)}
              className="text-sm"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Price range: $15 - $89
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Features" section="features">
        <div className="space-y-3">
          {features?.map((feature) => (
            <div key={feature?.value} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={filters?.features?.includes(feature?.value)}
                  onChange={(e) => handleFeatureChange(feature?.value, e?.target?.checked)}
                />
                <span className="text-sm font-body">{feature?.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">({feature?.count})</span>
            </div>
          ))}
        </div>
      </FilterSection>

      {isMobile && (
        <div className="p-4 border-t border-border">
          <Button 
            variant="default" 
            className="w-full"
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
        )}
        <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="bg-card rounded-t-xl max-h-[80vh] overflow-y-auto">
            {panelContent}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      {panelContent}
    </div>
  );
};

export default FilterPanel;