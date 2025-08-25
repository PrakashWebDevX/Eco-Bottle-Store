import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate cart count from localStorage or context
    const savedCartCount = localStorage.getItem('cartCount') || 0;
    setCartCount(parseInt(savedCartCount));

    // Check authentication status
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const PromoBanner = () => {
    if (!showPromoBanner) return null;

    return (
      <div className="bg-accent text-accent-foreground py-2 px-4 relative">
        <div className="container mx-auto flex items-center justify-center text-sm font-caption">
          <Icon name="Leaf" size={16} className="mr-2" />
          <span className="font-medium">Launch Special: 10% off all eco-bottles + Free shipping over $50</span>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 h-6 w-6 text-accent-foreground hover:bg-accent-foreground/10"
            onClick={() => setShowPromoBanner(false)}
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
    );
  };

  const Logo = () => (
    <Link to="/product-catalog-browse" className="flex items-center space-x-2 transition-gentle hover:opacity-80">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Droplets" size={20} color="white" />
      </div>
      <span className="font-heading font-bold text-xl text-foreground">EcoBottle</span>
    </Link>
  );

  const SearchInterface = () => (
    <div className="flex items-center">
      {/* Desktop Search */}
      <div className="hidden md:flex items-center bg-surface rounded-lg px-3 py-2 w-80">
        <Icon name="Search" size={18} className="text-muted-foreground mr-2" />
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <input
            type="text"
            placeholder="Search eco-friendly bottles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="bg-transparent border-none outline-none text-sm font-body w-full placeholder:text-muted-foreground"
          />
        </form>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden">
        {isSearchExpanded ? (
          <div className="flex items-center bg-surface rounded-lg px-3 py-2 w-64">
            <Icon name="Search" size={18} className="text-muted-foreground mr-2" />
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <input
                type="text"
                placeholder="Search bottles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="bg-transparent border-none outline-none text-sm font-body w-full placeholder:text-muted-foreground"
                autoFocus
              />
            </form>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="ml-2 h-6 w-6"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
            className="h-10 w-10"
          >
            <Icon name="Search" size={20} />
          </Button>
        )}
      </div>
    </div>
  );

  const NavigationTabs = () => (
    <nav className="flex items-center space-x-1">
      <Link
        to="/product-catalog-browse"
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-gentle ${
          isActiveRoute('/product-catalog-browse')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-surface'
        }`}
      >
        <Icon name="Store" size={18} />
        <span className="hidden sm:inline">Shop</span>
      </Link>

      <Link
        to="/shopping-cart"
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-gentle relative ${
          isActiveRoute('/shopping-cart')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-surface'
        }`}
      >
        <div className="relative">
          <Icon name="ShoppingCart" size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] font-mono">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </div>
        <span className="hidden sm:inline">Cart</span>
      </Link>

      <Link
        to={isAuthenticated ? "/user-account-dashboard" : "/user-authentication"}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-gentle ${
          isActiveRoute('/user-account-dashboard') || isActiveRoute('/user-authentication')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-surface'
        }`}
      >
        <Icon name={isAuthenticated ? "User" : "LogIn"} size={18} />
        <span className="hidden sm:inline">{isAuthenticated ? 'Account' : 'Sign In'}</span>
      </Link>
    </nav>
  );

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <PromoBanner />
      
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <SearchInterface />
            <NavigationTabs />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;