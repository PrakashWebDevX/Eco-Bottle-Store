import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-surface rounded-lg p-1 mb-8">
      <Button
        variant={activeTab === 'login' ? 'default' : 'ghost'}
        onClick={() => onTabChange('login')}
        className="flex-1 rounded-md"
      >
        Sign In
      </Button>
      <Button
        variant={activeTab === 'register' ? 'default' : 'ghost'}
        onClick={() => onTabChange('register')}
        className="flex-1 rounded-md"
      >
        Create Account
      </Button>
    </div>
  );
};

export default AuthTabs;