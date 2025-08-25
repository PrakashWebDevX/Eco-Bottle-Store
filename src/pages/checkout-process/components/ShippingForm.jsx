import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' }
  ];

  const stateOptions = [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' }
  ];

  const deliveryOptions = [
    { 
      id: 'standard', 
      name: 'Standard Delivery', 
      time: '5-7 business days', 
      price: 0,
      description: 'Free shipping on orders over $50'
    },
    { 
      id: 'expedited', 
      name: 'Expedited Shipping', 
      time: '2-3 business days', 
      price: 12.99,
      description: 'Perfect for active lifestyles'
    },
    { 
      id: 'overnight', 
      name: 'Overnight Express', 
      time: '1 business day', 
      price: 24.99,
      description: 'Get your eco-bottle tomorrow'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      shipping: {
        ...prev?.shipping,
        [field]: value
      }
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const shipping = formData?.shipping;

    if (!shipping?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!shipping?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!shipping?.email?.trim()) newErrors.email = 'Email is required';
    if (!shipping?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!shipping?.address?.trim()) newErrors.address = 'Address is required';
    if (!shipping?.city?.trim()) newErrors.city = 'City is required';
    if (!shipping?.state) newErrors.state = 'State is required';
    if (!shipping?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shipping?.country) newErrors.country = 'Country is required';
    if (!shipping?.deliveryOption) newErrors.deliveryOption = 'Please select a delivery option';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-organic p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Truck" size={20} className="text-primary" />
        <h2 className="text-xl font-heading font-bold text-foreground">Shipping Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={formData?.shipping?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={formData?.shipping?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.shipping?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll send order updates to this email"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData?.shipping?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          description="For delivery notifications"
          required
        />

        <Input
          label="Street Address"
          type="text"
          placeholder="123 Main Street"
          value={formData?.shipping?.address}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="City"
            value={formData?.shipping?.city}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />
          <Select
            label="State"
            options={stateOptions}
            value={formData?.shipping?.state}
            onChange={(value) => handleInputChange('state', value)}
            error={errors?.state}
            placeholder="Select state"
            required
          />
          <Input
            label="ZIP Code"
            type="text"
            placeholder="12345"
            value={formData?.shipping?.zipCode}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />
        </div>

        <Select
          label="Country"
          options={countryOptions}
          value={formData?.shipping?.country}
          onChange={(value) => handleInputChange('country', value)}
          error={errors?.country}
          placeholder="Select country"
          required
        />

        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Delivery Options</h3>
          <div className="space-y-3">
            {deliveryOptions?.map((option) => (
              <div
                key={option?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-gentle ${
                  formData?.shipping?.deliveryOption === option?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleInputChange('deliveryOption', option?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value={option?.id}
                      checked={formData?.shipping?.deliveryOption === option?.id}
                      onChange={() => handleInputChange('deliveryOption', option?.id)}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <div className="font-body font-medium text-foreground">{option?.name}</div>
                      <div className="text-sm text-muted-foreground">{option?.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-body font-semibold text-foreground">
                      {option?.price === 0 ? 'FREE' : `$${option?.price}`}
                    </div>
                    <div className="text-sm text-muted-foreground">{option?.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors?.deliveryOption && (
            <p className="text-sm text-error">{errors?.deliveryOption}</p>
          )}
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Save this address for future orders"
            checked={formData?.shipping?.saveAddress}
            onChange={(e) => handleInputChange('saveAddress', e?.target?.checked)}
          />
          <Checkbox
            label="Billing address is the same as shipping address"
            checked={formData?.shipping?.sameAsBilling}
            onChange={(e) => handleInputChange('sameAsBilling', e?.target?.checked)}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" iconName="ArrowRight" iconPosition="right">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;