import React from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge, { StockBadge, FeaturedBadge } from '../common/Badge';
import { useCart } from '../../hooks/useCart';

const SweetCard = ({ 
  sweet, 
  onView, 
  onEdit,
  showActions = true,
  isAdmin = false 
}) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart(sweet, 1);
  };

  const handleView = () => {
    if (onView) onView(sweet);
  };

  const discountedPrice = sweet.discountedPrice || sweet.price;
  const hasDiscount = discountedPrice < sweet.price;

  return (
    <Card hover className="overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          src={sweet.image || 'https://via.placeholder.com/300x200?text=Sweet'}
          alt={sweet.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {sweet.featured && <FeaturedBadge />}
          {hasDiscount && (
            <Badge variant="danger" className="bg-red-500 text-white">
              -{sweet.discount?.percentage || 0}%
            </Badge>
          )}
        </div>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={Eye}
            onClick={handleView}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            View
          </Button>
          {showActions && sweet.quantity > 0 && (
            <Button
              variant="primary"
              size="sm"
              icon={ShoppingCart}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="mb-2">
          <Badge variant="default" size="sm">
            {sweet.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {sweet.name}
        </h3>

        {/* Description */}
        {sweet.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {sweet.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">
              ${discountedPrice?.toFixed(2) || sweet.price?.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${sweet.price?.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Rating (if available) */}
          {sweet.ratings?.average > 0 && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {sweet.ratings.average.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Stock status */}
        <div className="flex items-center justify-between mb-4">
          <StockBadge quantity={sweet.quantity} />
          <span className="text-sm text-gray-500">
            {sweet.quantity} left
          </span>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2">
            <Button
              variant="primary"
              className="flex-1"
              disabled={sweet.quantity === 0}
              onClick={handleAddToCart}
              icon={ShoppingCart}
            >
              {sweet.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            
            {isAdmin && onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(sweet)}
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SweetCard;