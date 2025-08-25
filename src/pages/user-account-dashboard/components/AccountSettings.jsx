import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = ({ user, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    dateOfBirth: user?.dateOfBirth
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">
          Personal Information
        </h3>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  email: user?.email,
                  phone: user?.phone,
                  dateOfBirth: user?.dateOfBirth
                });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          disabled={!isEditing}
        />
        <Input
          label="Last Name"
          type="text"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          disabled={!isEditing}
        />
        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
        />
        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
        />
        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderAddressesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">
          Saved Addresses
        </h3>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Address
        </Button>
      </div>

      <div className="space-y-4">
        {user?.addresses?.map((address, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-body font-medium text-foreground">
                    {address?.label}
                  </h4>
                  {address?.isDefault && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm font-body text-muted-foreground">
                  {address?.street}<br />
                  {address?.city}, {address?.state} {address?.zipCode}<br />
                  {address?.country}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Edit" size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">
          Payment Methods
        </h3>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Card
        </Button>
      </div>

      <div className="space-y-4">
        {user?.paymentMethods?.map((method, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-surface rounded flex items-center justify-center">
                  <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">
                    •••• •••• •••• {method?.lastFour}
                  </p>
                  <p className="text-sm font-body text-muted-foreground">
                    {method?.brand} • Expires {method?.expiryDate}
                  </p>
                </div>
                {method?.isDefault && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Edit" size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-foreground">
        Notification Preferences
      </h3>

      <div className="space-y-4">
        {user?.notificationSettings?.map((setting, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div>
              <h4 className="font-body font-medium text-foreground">
                {setting?.title}
              </h4>
              <p className="text-sm font-body text-muted-foreground">
                {setting?.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={setting?.email}
                  className="rounded border-border"
                />
                <span className="text-sm font-body text-muted-foreground">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={setting?.sms}
                  className="rounded border-border"
                />
                <span className="text-sm font-body text-muted-foreground">SMS</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
        Account Settings
      </h2>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-body font-medium transition-gentle ${
              activeTab === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div>
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'addresses' && renderAddressesTab()}
        {activeTab === 'payments' && renderPaymentsTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
      </div>
    </div>
  );
};

export default AccountSettings;