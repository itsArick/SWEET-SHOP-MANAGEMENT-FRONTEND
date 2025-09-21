import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, X, ArrowLeft } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useSweetActions } from '../../hooks/useSweets';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import PageHeader from '../../components/layout/PageHeader';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, cartTotal, updateQuantity, removeItemFromCart, clearAllItems, isEmpty } = useCart();
  const { purchaseSweet } = useSweetActions();
  const navigate = useNavigate();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity === 0) {
      removeItemFromCart(item.sweetId);
    } else {
      updateQuantity(item.sweetId, newQuantity, item.sweetData);
    }
  };

  const handleCheckout = async () => {
    // Process each item in cart
    const purchasePromises = cart.map(item =>
      purchaseSweet(item.sweetId, item.quantity)
    );

    try {
      const results = await Promise.all(purchasePromises);
      const failedPurchases = results.filter(result => !result.success);
      
      if (failedPurchases.length === 0) {
        clearAllItems();
        toast.success('All items purchased successfully!');
        navigate('/orders');
      } else {
        toast.error('Some items could not be purchased. Please check stock availability.');
      }
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
    }
  };

  if (isEmpty) {
    return (
      <div>
        <PageHeader
          title="Shopping Cart"
          subtitle="Your cart is currently empty"
          breadcrumbs={[{ label: 'Shopping Cart' }]}
        />
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added any sweets to your cart yet. Start shopping to fill it up!"
          actionLabel="Start Shopping"
          onAction={() => navigate('/sweets')}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Shopping Cart"
        subtitle={`${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`}
        breadcrumbs={[{ label: 'Shopping Cart' }]}
        actions={[
          {
            label: 'Continue Shopping',
            variant: 'outline',
            icon: ArrowLeft,
            onClick: () => navigate('/sweets')
          }
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllItems}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.sweetId} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.sweetData?.image || 'https://via.placeholder.com/80x80?text=Sweet'}
                      alt={item.sweetData?.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.sweetData?.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {item.sweetData?.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${item.sweetData?.price?.toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                      disabled={item.quantity >= (item.sweetData?.quantity || 0)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${((item.sweetData?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItemFromCart(item.sweetId)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                icon={ShoppingBag}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate('/sweets')}
              >
                Continue Shopping
              </Button>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Free Shipping!</h3>
              <p className="text-sm text-green-700">
                Orders over $25 qualify for free standard shipping.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;