import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestCheckoutOption = ({ onGuestCheckout, onCreateAccount }) => {
  return (
    <div className="bg-card rounded-lg shadow-organic p-6 mb-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">Checkout Options</h2>
        <p className="text-muted-foreground font-body">
          Choose how you'd like to complete your purchase
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guest Checkout */}
        <div className="border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Zap" size={24} className="text-accent" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Guest Checkout</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Quick and easy checkout without creating an account
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 mb-6">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Faster checkout process</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>No account required</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="X" size={14} className="text-error" />
              <span>No order tracking</span>
            </li>
          </ul>
          <Button
            variant="outline"
            fullWidth
            onClick={onGuestCheckout}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue as Guest
          </Button>
        </div>

        {/* Create Account */}
        <div className="border border-primary rounded-lg p-6 text-center bg-primary/5">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="User" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Create Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get the full EcoBottle experience with order tracking and more
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 mb-6">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Track your orders</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Save addresses & payment</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Exclusive eco-tips & offers</span>
            </li>
          </ul>
          <Button
            fullWidth
            onClick={onCreateAccount}
            iconName="UserPlus"
            iconPosition="right"
          >
            Create Account
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="/user-authentication" className="text-primary hover:underline font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default GuestCheckoutOption;