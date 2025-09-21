import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

const Alert = ({
  type = 'info',
  title,
  children,
  onClose,
  className = ''
}) => {
  const types = {
    success: {
      containerClass: 'bg-green-50 border-green-200',
      iconClass: 'text-green-400',
      titleClass: 'text-green-800',
      textClass: 'text-green-700',
      icon: CheckCircle,
    },
    error: {
      containerClass: 'bg-red-50 border-red-200',
      iconClass: 'text-red-400',
      titleClass: 'text-red-800',
      textClass: 'text-red-700',
      icon: XCircle,
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200',
      iconClass: 'text-yellow-400',
      titleClass: 'text-yellow-800',
      textClass: 'text-yellow-700',
      icon: AlertCircle,
    },
    info: {
      containerClass: 'bg-blue-50 border-blue-200',
      iconClass: 'text-blue-400',
      titleClass: 'text-blue-800',
      textClass: 'text-blue-700',
      icon: Info,
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`rounded-md border p-4 ${config.containerClass} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.iconClass}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.titleClass}`}>
              {title}
            </h3>
          )}
          {children && (
            <div className={`${title ? 'mt-2' : ''} text-sm ${config.textClass}`}>
              {children}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.iconClass} hover:bg-opacity-20`}
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;