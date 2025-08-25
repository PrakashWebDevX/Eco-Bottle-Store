import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressBreadcrumbs = ({ currentStep }) => {
  const steps = [
    { id: 'shipping', label: 'Shipping', icon: 'Truck' },
    { id: 'payment', label: 'Payment', icon: 'CreditCard' },
    { id: 'confirmation', label: 'Confirmation', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    const stepIndex = steps?.findIndex(step => step?.id === stepId);
    const currentIndex = steps?.findIndex(step => step?.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="bg-surface py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            
            return (
              <div key={step?.id} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-gentle ${
                    status === 'completed' 
                      ? 'bg-success text-success-foreground' 
                      : status === 'active' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  <span className={`font-body font-medium text-sm ${
                    status === 'active' ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </span>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    status === 'completed' ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBreadcrumbs;