import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { usePurchases } from '../../hooks/usePurchases';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const OrdersPage = () => {
  const { purchases, fetchMyPurchases, cancelPurchase } = usePurchases();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    await fetchMyPurchases();
    setLoading(false);
  };

  const handleCancelOrder = async (purchaseId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      await cancelPurchase(purchaseId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading your orders..." />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="My Orders"
        subtitle="Track and manage your sweet orders"
        breadcrumbs={[{ label: 'My Orders' }]}
      />

      {purchases.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders found"
          description="You haven't placed any orders yet. Start shopping to see your orders here!"
          actionLabel="Start Shopping"
          onAction={() => window.location.href = '/sweets'}
        />
      ) : (
        <div className="space-y-6">
          {purchases.map((purchase) => (
            <Card key={purchase._id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(purchase.status)}
                    <h3 className="text-lg font-semibold">
                      Order #{purchase._id.slice(-8)}
                    </h3>
                    {getStatusBadge(purchase.status)}
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(purchase.purchaseDate)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary-600">
                    ${purchase.finalAmount.toFixed(2)}
                  </div>
                  {purchase.discountApplied > 0 && (
                    <div className="text-sm text-gray-500">
                      ({purchase.discountApplied}% discount applied)
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-4">
                  <img
                    src={purchase.sweet?.image || 'https://via.placeholder.com/60x60?text=Sweet'}
                    alt={purchase.sweet?.name}
                    className="w-15 h-15 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{purchase.sweet?.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {purchase.sweet?.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {purchase.quantity} × ${purchase.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {purchase.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                    {purchase.status === 'pending' && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelOrder(purchase._id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;