import React from 'react';
import Button from '../common/Button';
import Breadcrumb from './Breadcrumb';

const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions = [],
  className = '',
  children
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}

      {/* Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          )}
          {children}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'primary'}
                size={action.size || 'md'}
                icon={action.icon}
                onClick={action.onClick}
                disabled={action.disabled}
                loading={action.loading}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;