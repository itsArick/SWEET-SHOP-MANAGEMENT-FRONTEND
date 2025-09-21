import React from 'react';
import { Package, Plus } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = Package,
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gray-100 rounded-full">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          icon={Plus}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;