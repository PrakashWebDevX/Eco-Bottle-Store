import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fitnessGoals: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const fitnessGoalOptions = [
    { value: '', label: 'Select your primary fitness goal' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'endurance', label: 'Endurance Training' },
    { value: 'general-fitness', label: 'General Fitness' },
    { value: 'sports-performance', label: 'Sports Performance' },
    { value: 'yoga-wellness', label: 'Yoga & Wellness' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 1;
    if (/[A-Z]/?.test(password)) strength += 1;
    if (/[a-z]/?.test(password)) strength += 1;
    if (/[0-9]/?.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-error' };
      case 2: return { text: 'Weak', color: 'text-warning' };
      case 3: return { text: 'Fair', color: 'text-accent' };
      case 4: return { text: 'Good', color: 'text-success' };
      case 5: return { text: 'Strong', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      fitnessGoals: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        fitnessGoals: formData?.fitnessGoals,
        subscribeNewsletter: formData?.subscribeNewsletter,
        createdAt: new Date()?.toISOString()
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token-12345');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userEmail', formData?.email);
      
      onSuccess?.();
      navigate('/user-account-dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const handleSocialRegister = (provider) => {
    setIsLoading(true);
    // Simulate social registration
    setTimeout(() => {
      localStorage.setItem('authToken', `mock-${provider}-token-12345`);
      localStorage.setItem('userEmail', `user@${provider}.com`);
      onSuccess?.();
      navigate('/user-account-dashboard');
    }, 1000);
  };

  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData?.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData?.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        error={errors?.email}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          error={errors?.password}
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 h-8 w-8"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </Button>
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-surface rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength <= 1 ? 'bg-error w-1/5' :
                    passwordStrength === 2 ? 'bg-warning w-2/5' :
                    passwordStrength === 3 ? 'bg-accent w-3/5' :
                    passwordStrength === 4 ? 'bg-success w-4/5': 'bg-success w-full'
                  }`}
                ></div>
              </div>
              <span className={`text-xs font-medium ${strengthInfo?.color}`}>
                {strengthInfo?.text}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          error={errors?.confirmPassword}
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-8 h-8 w-8"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
        </Button>
      </div>
      <Select
        label="Fitness Goals (Optional)"
        description="Help us recommend the perfect bottle for your activities"
        options={fitnessGoalOptions}
        value={formData?.fitnessGoals}
        onChange={handleSelectChange}
        placeholder="Select your primary fitness goal"
      />
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          error={errors?.agreeToTerms}
          required
        />
        <Checkbox
          label="Subscribe to our newsletter for eco-friendly tips and exclusive offers"
          name="subscribeNewsletter"
          checked={formData?.subscribeNewsletter}
          onChange={handleInputChange}
        />
      </div>
      <Button
        type="submit"
        loading={isLoading}
        className="w-full"
        iconName="UserPlus"
        iconPosition="right"
      >
        Create Account
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground">Or sign up with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('google')}
          iconName="Chrome"
          iconPosition="left"
          disabled={isLoading}
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('apple')}
          iconName="Apple"
          iconPosition="left"
          disabled={isLoading}
        >
          Apple
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;