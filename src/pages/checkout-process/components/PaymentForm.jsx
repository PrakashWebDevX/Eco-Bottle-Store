import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' },
    { id: 'google', name: 'Google Pay', icon: 'Smartphone' }
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date()?.getFullYear() + i;
    return { value: String(year), label: String(year) };
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev?.payment,
        [field]: value
      }
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateCardForm = () => {
    const newErrors = {};
    const payment = formData?.payment;

    if (!payment?.cardNumber?.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required';
    if (!payment?.cardName?.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!payment?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!payment?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!payment?.cvv?.trim()) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (formData?.payment?.method === 'card') {
      if (validateCardForm()) {
        onNext();
      }
    } else {
      // For other payment methods, proceed directly
      onNext();
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e?.target?.value);
    handleInputChange('cardNumber', formatted);
  };

  return (
    <div className="bg-card rounded-lg shadow-organic p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="text-xl font-heading font-bold text-foreground">Payment Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods?.map((method) => (
              <div
                key={method?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-gentle ${
                  formData?.payment?.method === method?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleInputChange('method', method?.id)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method?.id}
                    checked={formData?.payment?.method === method?.id}
                    onChange={() => handleInputChange('method', method?.id)}
                    className="text-primary focus:ring-primary"
                  />
                  <Icon name={method?.icon} size={20} className="text-muted-foreground" />
                  <span className="font-body font-medium text-foreground">{method?.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {formData?.payment?.method === 'card' && (
          <div className="space-y-4 border-t border-border pt-6">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData?.payment?.cardNumber}
              onChange={handleCardNumberChange}
              error={errors?.cardNumber}
              maxLength={19}
              required
            />

            <Input
              label="Cardholder Name"
              type="text"
              placeholder="John Doe"
              value={formData?.payment?.cardName}
              onChange={(e) => handleInputChange('cardName', e?.target?.value)}
              error={errors?.cardName}
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <Select
                label="Month"
                options={monthOptions}
                value={formData?.payment?.expiryMonth}
                onChange={(value) => handleInputChange('expiryMonth', value)}
                error={errors?.expiryMonth}
                placeholder="MM"
                required
              />
              <Select
                label="Year"
                options={yearOptions}
                value={formData?.payment?.expiryYear}
                onChange={(value) => handleInputChange('expiryYear', value)}
                error={errors?.expiryYear}
                placeholder="YYYY"
                required
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={formData?.payment?.cvv}
                onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                error={errors?.cvv}
                maxLength={4}
                required
              />
            </div>
          </div>
        )}

        {formData?.payment?.method === 'paypal' && (
          <div className="bg-surface rounded-lg p-4 text-center">
            <Icon name="Wallet" size={32} className="text-primary mx-auto mb-2" />
            <p className="font-body text-foreground">You'll be redirected to PayPal to complete your payment</p>
          </div>
        )}

        {(formData?.payment?.method === 'apple' || formData?.payment?.method === 'google') && (
          <div className="bg-surface rounded-lg p-4 text-center">
            <Icon name="Smartphone" size={32} className="text-primary mx-auto mb-2" />
            <p className="font-body text-foreground">
              Use your {formData?.payment?.method === 'apple' ? 'Touch ID or Face ID' : 'fingerprint or PIN'} to complete payment
            </p>
          </div>
        )}

        <div className="space-y-4 border-t border-border pt-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="font-body">Your payment information is encrypted and secure</span>
          </div>
          
          <Checkbox
            label="Save payment method for future purchases"
            checked={formData?.payment?.savePayment}
            onChange={(e) => handleInputChange('savePayment', e?.target?.checked)}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
            Back to Shipping
          </Button>
          <Button type="submit" size="lg" iconName="ArrowRight" iconPosition="right">
            Review Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;