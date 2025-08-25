import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const filterChips = [
    ...activeFilters?.colors?.map(color => ({
      type: 'color',
      value: color,
      label: color,
      color: getColorHex(color)
    })),
    ...activeFilters?.capacities?.map(capacity => ({
      type: 'capacity',
      value: capacity,
      label: `${capacity}oz`
    })),
    ...(activeFilters?.priceRange?.min || activeFilters?.priceRange?.max ? [{
      type: 'price',
      value: 'price',
      label: `$${activeFilters?.priceRange?.min || 0} - $${activeFilters?.priceRange?.max || 100}`
    }] : [])
  ];

  function getColorHex(colorName) {
    const colorMap = {
      'Midnight Black': '#1a1a1a',
      'Ocean Blue': '#2563eb',
      'Forest Green': '#16a34a',
      'Sunset Orange': '#ea580c',
      'Arctic White': '#ffffff'
    };
    return colorMap?.[colorName] || '#6b7280';
  }

  if (filterChips?.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-surface/50 border-b border-border overflow-x-auto">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {filterChips?.map((chip, index) => (
          <div
            key={`${chip?.type}-${chip?.value}-${index}`}
            className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
          >
            {chip?.type === 'color' && (
              <div 
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: chip?.color }}
              />
            )}
            <span>{chip?.label}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 hover:bg-primary/20 rounded-full"
              onClick={() => onRemoveFilter(chip?.type, chip?.value)}
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        ))}
      </div>
      {filterChips?.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground whitespace-nowrap"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;