import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductSpecifications = ({ specifications }) => {
  const [expandedSections, setExpandedSections] = useState({
    temperature: true,
    materials: false,
    dimensions: false,
    care: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const specSections = [
    {
      id: 'temperature',
      title: 'Temperature Retention',
      icon: 'Thermometer',
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Snowflake" size={20} className="text-blue-500" />
              <span className="font-body">Cold Retention</span>
            </div>
            <span className="font-mono font-semibold text-primary">24 Hours</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Flame" size={20} className="text-red-500" />
              <span className="font-body">Hot Retention</span>
            </div>
            <span className="font-mono font-semibold text-primary">12 Hours</span>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Double-wall vacuum insulation technology maintains your drink's temperature for extended periods.
          </p>
        </div>
      )
    },
    {
      id: 'materials',title: 'Materials & Construction',icon: 'Shield',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-surface rounded-lg">
              <h4 className="font-body font-medium text-foreground mb-1">Body Material</h4>
              <p className="text-sm text-muted-foreground">18/8 Stainless Steel</p>
            </div>
            <div className="p-3 bg-surface rounded-lg">
              <h4 className="font-body font-medium text-foreground mb-1">Cap Material</h4>
              <p className="text-sm text-muted-foreground">BPA-Free Plastic</p>
            </div>
            <div className="p-3 bg-surface rounded-lg">
              <h4 className="font-body font-medium text-foreground mb-1">Insulation</h4>
              <p className="text-sm text-muted-foreground">Double-Wall Vacuum</p>
            </div>
            <div className="p-3 bg-surface rounded-lg">
              <h4 className="font-body font-medium text-foreground mb-1">Coating</h4>
              <p className="text-sm text-muted-foreground">Powder Coated</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-body">BPA-Free</span>
            <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-body">Food Grade</span>
            <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-body">Rust Resistant</span>
          </div>
        </div>
      )
    },
    {
      id: 'dimensions',title: 'Dimensions & Capacity',icon: 'Ruler',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-surface rounded-lg text-center">
              <h4 className="font-body font-medium text-foreground mb-1">Capacity</h4>
              <p className="text-2xl font-mono font-bold text-primary">750ml</p>
              <p className="text-sm text-muted-foreground">25.4 fl oz</p>
            </div>
            <div className="p-3 bg-surface rounded-lg text-center">
              <h4 className="font-body font-medium text-foreground mb-1">Weight</h4>
              <p className="text-2xl font-mono font-bold text-primary">420g</p>
              <p className="text-sm text-muted-foreground">14.8 oz</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-surface rounded-lg text-center">
              <h4 className="font-body font-medium text-foreground mb-1">Height</h4>
              <p className="font-mono font-semibold text-primary">26.7cm</p>
            </div>
            <div className="p-3 bg-surface rounded-lg text-center">
              <h4 className="font-body font-medium text-foreground mb-1">Diameter</h4>
              <p className="font-mono font-semibold text-primary">7.3cm</p>
            </div>
            <div className="p-3 bg-surface rounded-lg text-center">
              <h4 className="font-body font-medium text-foreground mb-1">Mouth</h4>
              <p className="font-mono font-semibold text-primary">5.3cm</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'care',title: 'Care Instructions',icon: 'Heart',
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start space-x-3 p-3 bg-surface rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="font-body font-medium text-foreground">Hand Wash Recommended</h4>
                <p className="text-sm text-muted-foreground">Use warm soapy water for best results</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-surface rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="font-body font-medium text-foreground">Dishwasher Safe</h4>
                <p className="text-sm text-muted-foreground">Top rack only, remove cap before washing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-surface rounded-lg">
              <Icon name="XCircle" size={20} className="text-error mt-0.5" />
              <div>
                <h4 className="font-body font-medium text-foreground">Avoid Bleach</h4>
                <p className="text-sm text-muted-foreground">Do not use bleach or harsh chemicals</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-surface rounded-lg">
              <Icon name="XCircle" size={20} className="text-error mt-0.5" />
              <div>
                <h4 className="font-body font-medium text-foreground">No Microwave</h4>
                <p className="text-sm text-muted-foreground">Stainless steel is not microwave safe</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-heading font-bold text-xl text-foreground">Technical Specifications</h2>
      <div className="space-y-3">
        {specSections?.map((section) => (
          <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full flex items-center justify-between p-4 bg-card hover:bg-surface transition-gentle"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section?.icon} size={20} className="text-primary" />
                <h3 className="font-body font-medium text-foreground">{section?.title}</h3>
              </div>
              <Icon 
                name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSections?.[section?.id] && (
              <div className="p-4 border-t border-border bg-background">
                {section?.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;