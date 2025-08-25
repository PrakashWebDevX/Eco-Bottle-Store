import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user, ecoMetrics }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-sm font-body text-muted-foreground">
                {user?.membershipStatus} Member
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">
                Member since {user?.memberSince}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Recycle" size={20} className="text-success" />
              <span className="text-2xl font-heading font-bold text-success">
                {ecoMetrics?.plasticBottlesSaved}
              </span>
            </div>
            <p className="text-xs font-body text-muted-foreground">
              Plastic bottles saved
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Leaf" size={20} className="text-primary" />
              <span className="text-2xl font-heading font-bold text-primary">
                {ecoMetrics?.carbonReduction}kg
              </span>
            </div>
            <p className="text-xs font-body text-muted-foreground">
              CO₂ reduction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;