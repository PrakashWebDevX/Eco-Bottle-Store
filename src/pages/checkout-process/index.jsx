import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CheckoutHeader from './components/CheckoutHeader';
import ProgressBreadcrumbs from './components/ProgressBreadcrumbs';
import GuestCheckoutOption from './components/GuestCheckoutOption';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CheckoutProcess = () => {
  const [currentStep, setCurrentStep] = useState('guest');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      deliveryOption: '',
      saveAddress: false,
      sameAsBilling: true
    },
    payment: {
      method: 'card',
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      savePayment: false
    }
  });

  // Mock order data - in real app this would come from cart context/state
  const [orderData] = useState({
    items: [
      {
        id: 1,
        name: "EcoBottle Pro 32oz",
        color: "midnight-black",
        quantity: 2,
        price: 44.99,
        originalPrice: 49.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"
      },
      {
        id: 1,
        name: "EcoBottle Pro 32oz",
        color: "ocean-blue",
        quantity: 1,
        price: 44.99,
        originalPrice: 49.99,
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop"
      }
    ],
    subtotal: 134.97,
    discount: 13.50,
    shipping: 0,
    tax: 10.82,
    total: 132.29
  });

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setCurrentStep('shipping');
    }
  }, []);

  const handleGuestCheckout = () => {
    setCurrentStep('shipping');
  };

  const handleCreateAccount = () => {
    window.location.href = '/user-authentication?redirect=checkout';
  };

  const handleShippingNext = () => {
    setCurrentStep('payment');
  };

  const handlePaymentNext = () => {
    setCurrentStep('confirmation');
  };

  const handlePaymentBack = () => {
    setCurrentStep('shipping');
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setCurrentStep('confirmation');
  };

  const getStepForBreadcrumbs = () => {
    if (currentStep === 'guest' || currentStep === 'shipping') return 'shipping';
    if (currentStep === 'payment') return 'payment';
    return 'confirmation';
  };

  return (
    <>
      <Helmet>
        <title>Secure Checkout - EcoBottle Store</title>
        <meta name="description" content="Complete your eco-friendly bottle purchase with our secure checkout process. Multiple payment options and fast shipping available." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        
        {currentStep !== 'guest' && (
          <ProgressBreadcrumbs currentStep={getStepForBreadcrumbs()} />
        )}

        <main className="container mx-auto px-4 py-8">
          {currentStep === 'guest' && (
            <div className="max-w-4xl mx-auto">
              <GuestCheckoutOption
                onGuestCheckout={handleGuestCheckout}
                onCreateAccount={handleCreateAccount}
              />
              <div className="mt-8">
                <OrderSummary orderData={orderData} />
              </div>
            </div>
          )}

          {(currentStep === 'shipping' || currentStep === 'payment') && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div className="lg:col-span-2">
                {currentStep === 'shipping' && (
                  <ShippingForm
                    onNext={handleShippingNext}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                
                {currentStep === 'payment' && (
                  <PaymentForm
                    onNext={handleCompleteOrder}
                    onBack={handlePaymentBack}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
              
              <div className="lg:col-span-1">
                <OrderSummary orderData={orderData} isSticky />
              </div>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="max-w-4xl mx-auto">
              <OrderConfirmation
                orderData={orderData}
                formData={formData}
              />
            </div>
          )}
        </main>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card rounded-lg shadow-organic-lg p-8 text-center max-w-md mx-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Icon name="CreditCard" size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Processing Your Order
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please don't close this window. We're securely processing your payment...
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="font-body">256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sticky Button */}
        {(currentStep === 'shipping' || currentStep === 'payment') && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body font-medium text-foreground">Total:</span>
              <span className="font-mono font-bold text-lg text-foreground">
                ${orderData?.total?.toFixed(2)}
              </span>
            </div>
            {currentStep === 'shipping' && (
              <Button
                fullWidth
                size="lg"
                onClick={handleShippingNext}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue to Payment
              </Button>
            )}
            {currentStep === 'payment' && (
              <Button
                fullWidth
                size="lg"
                onClick={handleCompleteOrder}
                loading={isProcessing}
                iconName="Lock"
                iconPosition="left"
              >
                Complete Order
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutProcess;