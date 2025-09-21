import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { useSweets } from '../../hooks/useSweets';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { StockBadge } from '../../components/common';
// import { StockBadge } from '../../components/sweets';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PageHeader from '../../components/layout/PageHeader';

const SweetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSweetById } = useSweets();
  const { addItemToCart } = useCart();
  const [sweet, setSweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadSweet();
  }, [id]);

  const loadSweet = async () => {
    setLoading(true);
    const result = await fetchSweetById(id);
    if (result.success) {
      setSweet(result.data);
    } else {
      navigate('/sweets');
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (sweet) {
      addItemToCart(sweet, quantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading sweet details..." />
      </div>
    );
  }

  if (!sweet) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Sweet not found</p>
        <Button onClick={() => navigate('/sweets')} className="mt-4">
          Back to Browse
        </Button>
      </div>
    );
  }

  const discountedPrice = sweet.discountedPrice || sweet.price;
  const hasDiscount = discountedPrice < sweet.price;

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Browse Sweets', href: '/sweets' },
          { label: sweet.name }
        ]}
        actions={[
          {
            label: 'Back to Browse',
            variant: 'outline',
            icon: ArrowLeft,
            onClick: () => navigate('/sweets')
          }
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <img
              src={sweet.image || 'https://via.placeholder.com/500x400?text=Sweet'}
              alt={sweet.name}
              className="w-full h-96 object-cover"
            />
          </Card>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" className="capitalize">
                    {sweet.category}
                  </Badge>
                  {sweet.featured && <Badge variant="info">Featured</Badge>}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {sweet.name}
                </h1>
                {sweet.ratings?.average > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(sweet.ratings.average)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {sweet.ratings.average.toFixed(1)} ({sweet.ratings.count} reviews)
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" icon={Heart}>
                  Save
                </Button>
                <Button variant="outline" size="sm" icon={Share2}>
                  Share
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary-600">
                  ${discountedPrice?.toFixed(2) || sweet.price?.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">
                    ${sweet.price?.toFixed(2)}
                  </span>
                )}
              </div>
              <StockBadge quantity={sweet.quantity} />
            </div>

            <div className="text-gray-600 mb-6">
              <span className="font-medium">{sweet.quantity}</span> items available
            </div>
          </div>

          {sweet.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{sweet.description}</p>
            </div>
          )}

          {sweet.ingredients && sweet.ingredients.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {sweet.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="default" size="sm">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {sweet.allergens && sweet.allergens.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Allergens</h3>
              <div className="flex flex-wrap gap-2">
                {sweet.allergens.map((allergen, index) => (
                  <Badge key={index} variant="warning" size="sm">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {sweet.nutritionalInfo && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {sweet.nutritionalInfo.calories && (
                  <div className="flex justify-between">
                    <span>Calories:</span>
                    <span>{sweet.nutritionalInfo.calories}</span>
                  </div>
                )}
                {sweet.nutritionalInfo.fat && (
                  <div className="flex justify-between">
                    <span>Fat:</span>
                    <span>{sweet.nutritionalInfo.fat}g</span>
                  </div>
                )}
                {sweet.nutritionalInfo.sugar && (
                  <div className="flex justify-between">
                    <span>Sugar:</span>
                    <span>{sweet.nutritionalInfo.sugar}g</span>
                  </div>
                )}
                {sweet.nutritionalInfo.protein && (
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span>{sweet.nutritionalInfo.protein}g</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  disabled={sweet.quantity === 0}
                >
                  {[...Array(Math.min(sweet.quantity, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Total Price</div>
                <div className="text-xl font-bold text-primary-600">
                  ${(discountedPrice * quantity).toFixed(2)}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={ShoppingCart}
              disabled={sweet.quantity === 0}
              onClick={handleAddToCart}
            >
              {sweet.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SweetDetail;