import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-surface/50" />
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-surface rounded w-3/4" />
        
        {/* Colors */}
        <div className="flex items-center gap-2">
          <div className="h-3 bg-surface rounded w-12" />
          <div className="flex gap-1">
            {[...Array(3)]?.map((_, i) => (
              <div key={i} className="w-4 h-4 bg-surface rounded-full" />
            ))}
          </div>
        </div>
        
        {/* Features */}
        <div className="flex gap-4">
          <div className="h-3 bg-surface rounded w-16" />
          <div className="h-3 bg-surface rounded w-12" />
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)]?.map((_, i) => (
              <div key={i} className="w-3 h-3 bg-surface rounded" />
            ))}
          </div>
          <div className="h-3 bg-surface rounded w-16" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 bg-surface rounded w-16" />
            <div className="h-4 bg-surface rounded w-12" />
          </div>
          <div className="h-3 bg-surface rounded w-16" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;