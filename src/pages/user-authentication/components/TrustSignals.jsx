import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your personal data is encrypted and protected'
    },
    {
      icon: 'Leaf',
      title: 'Eco-Friendly Impact',
      description: 'Track your environmental contribution with every purchase'
    },
    {
      icon: 'Truck',
      title: 'Order Tracking',
      description: 'Real-time updates on your bottle delivery'
    },
    {
      icon: 'Percent',
      title: 'Exclusive Discounts',
      description: 'Member-only deals and early access to new products'
    }
  ];

  return (
    <div className="bg-surface/50 rounded-xl p-6 space-y-4">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
        Why Create an Account?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-sm text-foreground">
                {feature?.title}
              </h4>
              <p className="font-body text-xs text-muted-foreground mt-1">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={14} className="text-success" />
          <span className="text-xs text-muted-foreground">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={14} className="text-success" />
          <span className="text-xs text-muted-foreground">Eco Certified</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={14} className="text-success" />
          <span className="text-xs text-muted-foreground">10k+ Members</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;