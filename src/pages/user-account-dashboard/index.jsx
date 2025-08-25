import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import WelcomeSection from './components/WelcomeSection';
import QuickActionCards from './components/QuickActionCards';
import OrderHistory from './components/OrderHistory';
import EcoRewardsSection from './components/EcoRewardsSection';
import AccountSettings from './components/AccountSettings';
import BottleCareCenter from './components/BottleCareCenter';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';

const UserAccountDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: "user_12345",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-03-15",
    membershipStatus: "Premium",
    memberSince: "January 2024",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    addresses: [
      {
        id: 1,
        label: "Home",
        street: "123 Fitness Avenue",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        country: "United States",
        isDefault: true
      },
      {
        id: 2,
        label: "Work",
        street: "456 Corporate Blvd",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "United States",
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 1,
        brand: "Visa",
        lastFour: "4242",
        expiryDate: "12/26",
        isDefault: true
      },
      {
        id: 2,
        brand: "Mastercard",
        lastFour: "8888",
        expiryDate: "08/25",
        isDefault: false
      }
    ],
    notificationSettings: [
      {
        title: "Order Updates",
        description: "Get notified about order status changes",
        email: true,
        sms: true
      },
      {
        title: "Fitness Tips",
        description: "Receive weekly fitness and hydration tips",
        email: true,
        sms: false
      },
      {
        title: "Eco Impact Reports",
        description: "Monthly sustainability impact updates",
        email: true,
        sms: false
      },
      {
        title: "Promotional Offers",
        description: "Special deals and launch discounts",
        email: false,
        sms: false
      }
    ]
  };

  const mockEcoMetrics = {
    plasticBottlesSaved: 127,
    carbonReduction: 15.8,
    totalOrders: 8,
    favoriteColor: "Ocean Blue"
  };

  const mockRecentOrders = [
    {
      id: "ORD-2024-001",
      orderNumber: "EB240825001",
      orderDate: "August 20, 2024",
      deliveryDate: "August 23, 2024",
      status: "Delivered",
      total: "89.99",
      trackingNumber: "1Z999AA1234567890",
      shippingAddress: "123 Fitness Avenue, San Francisco, CA 94102",
      items: [
        {
          id: 1,
          name: "EcoBottle Pro 32oz",
          color: "Ocean Blue",
          quantity: 2,
          price: "44.99",
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2024-002",
      orderNumber: "EB240815002",
      orderDate: "August 15, 2024",
      deliveryDate: "August 18, 2024",
      status: "Delivered",
      total: "134.97",
      trackingNumber: "1Z999AA1234567891",
      shippingAddress: "123 Fitness Avenue, San Francisco, CA 94102",
      items: [
        {
          id: 1,
          name: "EcoBottle Pro 32oz",
          color: "Forest Green",
          quantity: 1,
          price: "44.99",
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop"
        },
        {
          id: 2,
          name: "EcoBottle Pro 32oz",
          color: "Sunset Orange",
          quantity: 2,
          price: "44.99",
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2024-003",
      orderNumber: "EB240810003",
      orderDate: "August 10, 2024",
      deliveryDate: "Expected August 28, 2024",
      status: "Shipped",
      total: "49.49",
      trackingNumber: "1Z999AA1234567892",
      shippingAddress: "456 Corporate Blvd, San Francisco, CA 94105",
      items: [
        {
          id: 1,
          name: "EcoBottle Pro 32oz",
          color: "Midnight Black",
          quantity: 1,
          price: "49.49",
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop"
        }
      ]
    }
  ];

  const mockRewards = {
    currentPoints: 1250,
    nextTierThreshold: 2000,
    pointsToNext: 750,
    tier: "Eco Starter"
  };

  const mockRecommendations = {
    basedOnHistory: [
      {
        id: "rec_1",
        name: "EcoBottle Pro 40oz",
        description: "Larger capacity for longer workouts",
        currentPrice: "54.99",
        originalPrice: "59.99",
        discount: 8,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
        recommendationReason: "You love the 32oz version",
        isNew: false
      },
      {
        id: "rec_2",
        name: "EcoBottle Sport Cap",
        description: "Quick-sip cap for active use",
        currentPrice: "14.99",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
        recommendationReason: "Perfect for your Ocean Blue bottle",
        isNew: true
      }
    ],
    fitnessGoals: [
      {
        id: "rec_3",
        name: "EcoBottle Insulated Sleeve",
        description: "Extra protection and grip",
        currentPrice: "19.99",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
        recommendationReason: "Enhance your workout experience",
        isNew: false
      }
    ],
    ecoFriendly: [
      {
        id: "rec_4",
        name: "EcoBottle Cleaning Kit",
        description: "Eco-friendly cleaning tablets",
        currentPrice: "12.99",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
        recommendationReason: "Maintain your bottles sustainably",
        isNew: false
      }
    ]
  };

  const mockPurchaseHistory = {
    favoriteColor: {
      name: "Ocean Blue",
      count: 3
    },
    averageDaysBetweenOrders: 15,
    nextPredictedOrder: "September 5, 2024"
  };

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(mockUser);
      setLoading(false);
    };

    loadUserData();
  }, []);

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    // Here you would typically make an API call to update the user profile
    console.log('Profile updated:', updatedData);
  };

  const sidebarSections = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Order History', icon: 'Package' },
    { id: 'rewards', label: 'Eco Rewards', icon: 'Award' },
    { id: 'care', label: 'Bottle Care', icon: 'Heart' },
    { id: 'settings', label: 'Account Settings', icon: 'Settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Account Dashboard - EcoBottle Store</title>
        <meta name="description" content="Manage your EcoBottle account, view order history, track eco-impact, and access bottle care guides for optimal performance." />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Section Selector */}
        <div className="lg:hidden mb-6">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e?.target?.value)}
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          >
            {sidebarSections?.map((section) => (
              <option key={section?.id} value={section?.id}>
                {section?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
              <nav className="space-y-2">
                {sidebarSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-body font-medium transition-gentle text-left ${
                      activeSection === section?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-surface'
                    }`}
                  >
                    <span className="text-lg">
                      {section?.icon === 'LayoutDashboard' && '📊'}
                      {section?.icon === 'Package' && '📦'}
                      {section?.icon === 'Award' && '🏆'}
                      {section?.icon === 'Heart' && '💚'}
                      {section?.icon === 'Settings' && '⚙️'}
                    </span>
                    <span>{section?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'overview' && (
              <div>
                <WelcomeSection user={user} ecoMetrics={mockEcoMetrics} />
                <QuickActionCards 
                  recentOrders={mockRecentOrders} 
                  activeShipments={1} 
                />
                <PersonalizedRecommendations 
                  recommendations={mockRecommendations}
                  purchaseHistory={mockPurchaseHistory}
                />
              </div>
            )}

            {activeSection === 'orders' && (
              <OrderHistory orders={mockRecentOrders} />
            )}

            {activeSection === 'rewards' && (
              <EcoRewardsSection 
                rewards={mockRewards}
                badges={[]}
              />
            )}

            {activeSection === 'care' && (
              <BottleCareCenter />
            )}

            {activeSection === 'settings' && (
              <AccountSettings 
                user={user}
                onUpdateProfile={handleUpdateProfile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountDashboard;