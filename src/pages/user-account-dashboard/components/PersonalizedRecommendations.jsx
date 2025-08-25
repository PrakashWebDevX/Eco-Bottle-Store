import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ recommendations, purchaseHistory }) => {
  const recommendationCategories = [
    {
      id: 'based-on-history',
      title: 'Based on Your Purchases',
      description: 'Products similar to your favorites',
      icon: 'History',
      products: recommendations?.basedOnHistory
    },
    {
      id: 'fitness-goals',
      title: 'For Your Fitness Goals',
      description: 'Perfect for your active lifestyle',
      icon: 'Dumbbell',
      products: recommendations?.fitnessGoals
    },
    {
      id: 'eco-friendly',
      title: 'Eco-Friendly Upgrades',
      description: 'Sustainable choices for conscious living',
      icon: 'Leaf',
      products: recommendations?.ecoFriendly
    }
  ];

  const ProductCard = ({ product, reason }) => (
    <div className="bg-background border border-border rounded-lg p-4 hover:shadow-organic transition-gentle">
      <div className="relative mb-3">
        <div className="w-full h-32 rounded-lg overflow-hidden bg-surface">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>
        {product?.isNew && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
            New
          </span>
        )}
        {product?.discount && (
          <span className="absolute top-2 right-2 bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-full">
            -{product?.discount}%
          </span>
        )}
      </div>

      <div className="mb-3">
        <h4 className="font-body font-medium text-foreground mb-1">
          {product?.name}
        </h4>
        <p className="text-sm font-body text-muted-foreground mb-2">
          {product?.description}
        </p>
        
        {reason && (
          <div className="flex items-center space-x-1 mb-2">
            <Icon name="Lightbulb" size={12} className="text-accent" />
            <span className="text-xs font-body text-accent">
              {reason}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span className="font-heading font-semibold text-foreground">
            ${product?.currentPrice}
          </span>
          {product?.originalPrice && product?.originalPrice !== product?.currentPrice && (
            <span className="text-sm font-body text-muted-foreground line-through">
              ${product?.originalPrice}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          iconName="Eye"
          iconPosition="left"
        >
          View
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Recommended for You
        </h2>
        <Link to="/product-catalog-browse">
          <Button variant="outline" size="sm">
            View All Products
          </Button>
        </Link>
      </div>
      {recommendationCategories?.map((category) => (
        <div key={category?.id} className="mb-8 last:mb-0">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={category?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                {category?.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground">
                {category?.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category?.products?.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                reason={product?.recommendationReason}
              />
            ))}
          </div>
        </div>
      ))}
      {/* Purchase Pattern Insights */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Your Shopping Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Heart" size={16} className="text-error" />
              <span className="font-body font-medium text-foreground">
                Favorite Color
              </span>
            </div>
            <p className="text-sm font-body text-muted-foreground">
              You've purchased {purchaseHistory?.favoriteColor?.name} bottles {purchaseHistory?.favoriteColor?.count} times
            </p>
          </div>

          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="font-body font-medium text-foreground">
                Purchase Frequency
              </span>
            </div>
            <p className="text-sm font-body text-muted-foreground">
              You order every {purchaseHistory?.averageDaysBetweenOrders} days on average
            </p>
          </div>

          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="font-body font-medium text-foreground">
                Next Reorder
              </span>
            </div>
            <p className="text-sm font-body text-muted-foreground">
              Predicted reorder date: {purchaseHistory?.nextPredictedOrder}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;