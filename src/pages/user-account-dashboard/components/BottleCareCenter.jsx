import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BottleCareCenter = () => {
  const [activeGuide, setActiveGuide] = useState('cleaning');

  const careGuides = [
    {
      id: 'cleaning',
      title: 'Daily Cleaning',
      icon: 'Droplets',
      color: 'bg-primary',
      steps: [
        "Rinse with warm water after each use",
        "Use mild dish soap and a bottle brush for deep cleaning",
        "For tough odors, mix baking soda with warm water",
        "Rinse thoroughly and air dry completely",
        "Clean the cap and threads regularly"
      ]
    },
    {
      id: 'maintenance',
      title: 'Maintenance Schedule',
      icon: 'Calendar',
      color: 'bg-success',
      steps: [
        "Weekly: Deep clean with vinegar solution",
        "Monthly: Check for dents or damage",
        "Quarterly: Inspect cap seal and threads",
        "Replace cap gasket if worn (every 6 months)",
        "Professional inspection annually for heavy use"
      ]
    },
    {
      id: 'temperature',
      title: 'Temperature Optimization',
      icon: 'Thermometer',
      color: 'bg-accent',
      steps: [
        "Pre-chill bottle in freezer for 10 minutes before cold drinks",
        "Pre-heat with warm water before adding hot beverages",
        "Fill completely to maximize temperature retention",
        "Keep cap tightly closed when not drinking",
        "Avoid extreme temperature changes"
      ]
    },
    {
      id: 'storage',
      title: 'Proper Storage',
      icon: 'Home',
      color: 'bg-secondary',
      steps: [
        "Store with cap off to allow air circulation",
        "Keep in cool, dry place away from direct sunlight",
        "Avoid storing in car or hot environments",
        "Don\'t store with liquids for extended periods",
        "Use protective sleeve to prevent scratches"
      ]
    }
  ];

  const maintenanceReminders = [
    {
      id: 1,
      task: "Weekly Deep Clean",
      dueDate: "2024-08-30",
      priority: "medium",
      completed: false
    },
    {
      id: 2,
      task: "Monthly Inspection",
      dueDate: "2024-09-01",
      priority: "low",
      completed: false
    },
    {
      id: 3,
      task: "Cap Gasket Check",
      dueDate: "2024-09-15",
      priority: "high",
      completed: true
    }
  ];

  const troubleshootingTips = [
    {
      problem: "Bottle not keeping drinks cold",
      solutions: [
        "Check if cap is properly sealed",
        "Ensure bottle is filled completely",
        "Pre-chill bottle before use",
        "Inspect for dents that may affect insulation"
      ]
    },
    {
      problem: "Strange taste or odor",
      solutions: [
        "Deep clean with baking soda solution",
        "Rinse with vinegar and water mixture",
        "Let air dry completely between uses",
        "Replace cap if odor persists"
      ]
    },
    {
      problem: "Cap difficult to open/close",
      solutions: [
        "Clean threads with soft brush",
        "Check for debris in cap mechanism",
        "Apply food-grade lubricant if needed",
        "Replace cap if threads are damaged"
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-surface';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
        Bottle Care Center
      </h2>
      {/* Care Guide Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {careGuides?.map((guide) => (
          <button
            key={guide?.id}
            onClick={() => setActiveGuide(guide?.id)}
            className={`p-4 rounded-lg border transition-gentle ${
              activeGuide === guide?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/20'
            }`}
          >
            <div className={`w-10 h-10 ${guide?.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <Icon name={guide?.icon} size={20} className="text-white" />
            </div>
            <h3 className="font-body font-medium text-sm text-foreground text-center">
              {guide?.title}
            </h3>
          </button>
        ))}
      </div>
      {/* Active Guide Content */}
      <div className="bg-surface rounded-lg p-6 mb-6">
        {careGuides?.map((guide) => (
          activeGuide === guide?.id && (
            <div key={guide?.id}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${guide?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={guide?.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {guide?.title}
                </h3>
              </div>
              <div className="space-y-3">
                {guide?.steps?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-mono font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="font-body text-foreground">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
      {/* Maintenance Reminders */}
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Maintenance Reminders
        </h3>
        <div className="space-y-3">
          {maintenanceReminders?.map((reminder) => (
            <div
              key={reminder?.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                reminder?.completed 
                  ? 'border-success/20 bg-success/5' :'border-border bg-background'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  reminder?.completed 
                    ? 'border-success bg-success' :'border-border'
                }`}>
                  {reminder?.completed && (
                    <Icon name="Check" size={12} className="text-success-foreground" />
                  )}
                </div>
                <div>
                  <p className={`font-body font-medium ${
                    reminder?.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                  }`}>
                    {reminder?.task}
                  </p>
                  <p className="text-sm font-body text-muted-foreground">
                    Due: {reminder?.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder?.priority)}`}>
                  {reminder?.priority}
                </span>
                {!reminder?.completed && (
                  <Button variant="outline" size="sm">
                    Mark Done
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Troubleshooting Section */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Troubleshooting Tips
        </h3>
        <div className="space-y-4">
          {troubleshootingTips?.map((tip, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <h4 className="font-body font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <span>{tip?.problem}</span>
              </h4>
              <div className="space-y-2">
                {tip?.solutions?.map((solution, sIndex) => (
                  <div key={sIndex} className="flex items-start space-x-2">
                    <Icon name="ArrowRight" size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-body text-muted-foreground">
                      {solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottleCareCenter;