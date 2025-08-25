import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EcoRewardsSection = ({ rewards, badges }) => {
  const rewardTiers = [
    { name: 'Eco Starter', threshold: 0, color: 'bg-secondary', current: true },
    { name: 'Green Warrior', threshold: 50, color: 'bg-success', current: false },
    { name: 'Sustainability Champion', threshold: 100, color: 'bg-primary', current: false },
    { name: 'Planet Guardian', threshold: 200, color: 'bg-accent', current: false }
  ];

  const availableBadges = [
    {
      id: 'first-purchase',
      name: 'First Purchase',
      description: 'Made your first eco-friendly choice',
      icon: 'ShoppingBag',
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: 'repeat-customer',
      name: 'Loyal Customer',
      description: 'Made 5+ purchases',
      icon: 'Heart',
      earned: true,
      earnedDate: '2024-03-22'
    },
    {
      id: 'referral-master',
      name: 'Referral Master',
      description: 'Referred 3+ friends',
      icon: 'Users',
      earned: true,
      earnedDate: '2024-06-10'
    },
    {
      id: 'eco-champion',
      name: 'Eco Champion',
      description: 'Saved 100+ plastic bottles',
      icon: 'Award',
      earned: false,
      progress: 67
    },
    {
      id: 'fitness-enthusiast',
      name: 'Fitness Enthusiast',
      description: 'Purchased all color variants',
      icon: 'Dumbbell',
      earned: false,
      progress: 80
    },
    {
      id: 'sustainability-advocate',
      name: 'Sustainability Advocate',
      description: 'Shared 10+ eco-tips',
      icon: 'Megaphone',
      earned: false,
      progress: 30
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Eco Rewards & Badges
        </h2>
        <Button variant="outline" size="sm">
          Redeem Points
        </Button>
      </div>
      {/* Current Rewards Status */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Current Points: {rewards?.currentPoints}
            </h3>
            <p className="text-sm font-body text-muted-foreground">
              {rewards?.pointsToNext} points to next tier
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Trophy" size={20} className="text-accent" />
              <span className="font-heading font-medium text-foreground">
                Eco Starter
              </span>
            </div>
            <p className="text-xs font-body text-muted-foreground">
              Current Tier
            </p>
          </div>
        </div>
        
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${(rewards?.currentPoints / rewards?.nextTierThreshold) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Badges Grid */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Achievement Badges
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {availableBadges?.map((badge) => (
            <div
              key={badge?.id}
              className={`relative p-4 rounded-lg border transition-gentle ${
                badge?.earned
                  ? 'border-success bg-success/5 hover:shadow-organic'
                  : 'border-border bg-surface hover:border-primary/20'
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  badge?.earned 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={badge?.icon} size={20} />
                </div>
                
                <h4 className={`font-body font-medium text-xs mb-1 ${
                  badge?.earned ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {badge?.name}
                </h4>
                
                <p className="text-xs font-body text-muted-foreground mb-2">
                  {badge?.description}
                </p>

                {badge?.earned ? (
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="Check" size={12} className="text-success" />
                    <span className="text-xs font-mono text-success">
                      Earned
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="w-full bg-border rounded-full h-1 mb-1">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${badge?.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {badge?.progress}%
                    </span>
                  </div>
                )}
              </div>

              {badge?.earned && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-success-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Referral Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-1">
              Refer Friends & Earn
            </h3>
            <p className="text-sm font-body text-muted-foreground">
              Give $10, Get $10 for each successful referral
            </p>
          </div>
          <Button variant="default" size="sm">
            Share Referral Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EcoRewardsSection;