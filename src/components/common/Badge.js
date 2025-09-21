import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';

  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

// Stock status badges
export const StockBadge = ({ quantity }) => {
  if (quantity === 0) {
    return <Badge variant="danger">Out of Stock</Badge>;
  } else if (quantity <= 5) {
    return <Badge variant="warning">Low Stock</Badge>;
  } else {
    return <Badge variant="success">In Stock</Badge>;
  }
};

// Featured badge
export const FeaturedBadge = () => (
  <Badge variant="info" className="bg-purple-100 text-purple-800">
    Featured
  </Badge>
);

export default Badge;