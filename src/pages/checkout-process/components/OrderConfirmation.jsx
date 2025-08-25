import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderConfirmation = ({ orderData, formData }) => {
  const [isSharing, setIsSharing] = useState(false);
  
  const orderNumber = `ECO-${Date.now()?.toString()?.slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const colorNames = {
    'midnight-black': 'Midnight Black',
    'ocean-blue': 'Ocean Blue',
    'forest-green': 'Forest Green',
    'sunset-orange': 'Sunset Orange',
    'arctic-white': 'Arctic White'
  };

  const careInstructions = [
    "Hand wash with warm soapy water for best results",
    "Avoid abrasive cleaners to maintain finish",
    "Dry thoroughly after each use",
    "Store with cap off to prevent odors",
    "Use bottle brush for deep cleaning"
  ];

  const handleShare = async (platform) => {
    setIsSharing(true);
    const shareText = `Just ordered my eco-friendly EcoBottle! 🌱 Supporting sustainable hydration with premium stainless steel bottles. Order #${orderNumber}`;
    
    try {
      if (platform === 'native' && navigator.share) {
        await navigator.share({
          title: 'My EcoBottle Purchase',
          text: shareText,
          url: window.location?.origin
        });
      } else {
        // Fallback for specific platforms
        const urls = {
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location?.origin)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location?.origin)}`
        };
        
        if (urls?.[platform]) {
          window.open(urls?.[platform], '_blank', 'width=600,height=400');
        }
      }
    } catch (error) {
      console.log('Sharing failed:', error);
    }
    
    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground font-body">
          Thank you for choosing EcoBottle. Your order has been successfully placed.
        </p>
      </div>
      {/* Order Details */}
      <div className="bg-card rounded-lg shadow-organic p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Order Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-mono font-medium text-foreground">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-body text-foreground">
                  {new Date()?.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-mono font-semibold text-foreground">${orderData?.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Delivery Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-body text-foreground">{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Method:</span>
                <span className="font-body text-foreground">
                  {formData?.shipping?.deliveryOption === 'standard' ? 'Standard Delivery' :
                   formData?.shipping?.deliveryOption === 'expedited'? 'Expedited Shipping' : 'Overnight Express'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Address:</span>
                <span className="font-body text-foreground text-right">
                  {formData?.shipping?.address}<br />
                  {formData?.shipping?.city}, {formData?.shipping?.state} {formData?.shipping?.zipCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="border-t border-border pt-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Your Items</h2>
          <div className="space-y-4">
            {orderData?.items?.map((item) => (
              <div key={`${item?.id}-${item?.color}`} className="flex items-center space-x-4">
                <Image
                  src={item?.image}
                  alt={`${item?.name} in ${colorNames?.[item?.color]}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-body font-medium text-foreground">{item?.name}</h3>
                  <p className="text-sm text-muted-foreground">Color: {colorNames?.[item?.color]}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item?.quantity}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-medium text-foreground">${(item?.price * item?.quantity)?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Care Instructions */}
      <div className="bg-card rounded-lg shadow-organic p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Heart" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">Care Instructions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Keep your EcoBottle in perfect condition with these simple care tips:
            </p>
            <ul className="space-y-2">
              {careInstructions?.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="font-body text-foreground">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Thermometer" size={16} className="text-primary" />
              <span className="font-body font-medium text-foreground">Temperature Performance</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cold Retention:</span>
                <span className="font-body text-foreground">24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hot Retention:</span>
                <span className="font-body text-foreground">12 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Social Sharing */}
      <div className="bg-card rounded-lg shadow-organic p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Share2" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">Share Your Eco-Choice</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Inspire others to make sustainable choices! Share your EcoBottle purchase with friends.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('twitter')}
            iconName="Twitter"
            iconPosition="left"
            disabled={isSharing}
          >
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('facebook')}
            iconName="Facebook"
            iconPosition="left"
            disabled={isSharing}
          >
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('linkedin')}
            iconName="Linkedin"
            iconPosition="left"
            disabled={isSharing}
          >
            LinkedIn
          </Button>
          {navigator.share && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('native')}
              iconName="Share"
              iconPosition="left"
              disabled={isSharing}
            >
              Share
            </Button>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.print()}
          iconName="Printer"
          iconPosition="left"
        >
          Print Order
        </Button>
        <Button
          size="lg"
          onClick={() => window.location.href = '/product-catalog-browse'}
          iconName="ShoppingBag"
          iconPosition="left"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;