import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = ({ recentOrders, activeShipments }) => {
  const quickActions = [
    {
      id: 'reorder',
      title: 'Quick Reorder',
      description: 'Reorder your favorite bottles',
      icon: 'RotateCcw',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: 'Reorder Now',
      count: recentOrders?.length
    },
    {
      id: 'track',
      title: 'Track Orders',
      description: 'Monitor your shipments',
      icon: 'Package',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      action: 'Track Now',
      count: activeShipments
    },
    {
      id: 'care',
      title: 'Bottle Care',
      description: 'Maintenance guides & tips',
      icon: 'Heart',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      action: 'View Guides',
      count: null
    },
    {
      id: 'rewards',
      title: 'Eco Rewards',
      description: 'Your sustainability badges',
      icon: 'Award',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      action: 'View Rewards',
      count: 8
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {quickActions?.map((action) => (
        <div
          key={action?.id}
          className="bg-card rounded-xl p-6 border border-border hover:shadow-organic-md transition-gentle"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={action?.icon} size={24} className={action?.textColor} />
            </div>
            {action?.count !== null && (
              <span className="bg-surface text-foreground text-xs font-mono font-bold px-2 py-1 rounded-full">
                {action?.count}
              </span>
            )}
          </div>
          
          <h3 className="font-heading font-semibold text-foreground mb-1">
            {action?.title}
          </h3>
          <p className="text-sm font-body text-muted-foreground mb-4">
            {action?.description}
          </p>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              if (action?.id === 'reorder') {
                // Handle reorder logic
              } else if (action?.id === 'track') {
                // Handle tracking logic
              }
            }}
          >
            {action?.action}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuickActionCards;