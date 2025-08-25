import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TrustSignals from './components/TrustSignals';
import GuestCheckoutOption from './components/GuestCheckoutOption';
import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/user-account-dashboard');
    }

    // Set initial tab based on URL params or state
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams?.get('mode') || location?.state?.mode;
    if (mode === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleAuthSuccess = () => {
    setIsLoading(true);
    // Redirect will be handled by the form components
  };

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      alt: "Athlete drinking from stainless steel water bottle during workout"
    },
    {
      src: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?w=800&h=600&fit=crop",
      alt: "Eco-friendly water bottles in gym environment"
    },
    {
      src: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=800&h=600&fit=crop",
      alt: "Fitness enthusiasts staying hydrated with premium bottles"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages?.length]);

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-organic-lg">
              <div className="aspect-[4/3] relative">
                {heroImages?.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image?.src}
                      alt={image?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="Droplets" size={14} color="white" />
                      </div>
                      <span className="text-white font-body font-medium text-sm">
                        Premium Eco-Friendly
                      </span>
                    </div>
                    <h2 className="text-white font-heading font-bold text-2xl mb-2">
                      Stay Hydrated, Stay Sustainable
                    </h2>
                    <p className="text-white/90 font-body text-sm">
                      Join thousands of fitness enthusiasts choosing eco-friendly hydration solutions
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {heroImages?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white' :'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <TrustSignals />

            {/* Guest Checkout Option - Mobile */}
            <div className="lg:hidden">
              <GuestCheckoutOption />
            </div>

            {/* Features Highlight */}
            <div className="hidden lg:block bg-card rounded-xl p-6 shadow-organic">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Why Choose EcoBottle?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Thermometer" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-sm text-foreground">
                      Superior Temperature Retention
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      24 hours cold, 12 hours hot performance
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Recycle" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-sm text-foreground">
                      100% Recyclable Materials
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      Premium stainless steel construction
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Percent" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-sm text-foreground">
                      Launch Special: 10% Off
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      Limited time offer for new customers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Authentication Forms */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Join EcoBottle'}
              </h1>
              <p className="font-body text-muted-foreground">
                {activeTab === 'login' ?'Sign in to access your account and track your eco-friendly journey' :'Create your account and start your sustainable hydration journey'
                }
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-organic-lg p-8">
              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              {activeTab === 'login' ? (
                <LoginForm onSuccess={handleAuthSuccess} />
              ) : (
                <RegisterForm onSuccess={handleAuthSuccess} />
              )}
            </div>

            {/* Guest Checkout Option - Desktop */}
            <div className="hidden lg:block">
              <GuestCheckoutOption />
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} className="text-success" />
                  <span>256-bit SSL</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={12} className="text-success" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} className="text-success" />
                  <span>Privacy Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="font-body text-foreground">Signing you in...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuthentication;