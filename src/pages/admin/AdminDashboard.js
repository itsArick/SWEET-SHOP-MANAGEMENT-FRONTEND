import React, { useEffect, useCallback } from 'react';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Eye,
  Plus
} from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Grid } from '../../components/layout';

const AdminDashboard = () => {
  const { 
    dashboardStats, 
    inventoryStatus, 
    fetchDashboardStats, 
    fetchInventoryStatus, 
    loading 
  } = useDashboard();

  // ADD THIS - Wrap the function in useCallback
  const loadDashboardData = useCallback(async () => {
    await Promise.all([
      fetchDashboardStats(),
      fetchInventoryStatus()
    ]);
  }, [fetchDashboardStats, fetchInventoryStatus]);

  useEffect(() => {
    loadDashboardData(); // Now use the wrapped function
  }, [loadDashboardData]); // Include loadDashboardData as dependency

  if (loading.dashboard) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const StatCard = ({ title, value, change, icon: Icon, color = 'primary' }) => {
    const colorClasses = {
      primary: 'bg-primary-100 text-primary-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
    };

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                {change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(change)}% from last month
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Overview of your sweet shop performance"
        breadcrumbs={[{ label: 'Admin Dashboard' }]}
        actions={[
          {
            label: 'Add Sweet',
            variant: 'primary',
            icon: Plus,
            onClick: () => window.location.href = '/admin/sweets/new'
          }
        ]}
      />

      {/* Stats Cards */}
      <Grid cols={4} gap={6} className="mb-8">
        <StatCard
          title="Total Users"
          value={dashboardStats?.users?.total || 0}
          change={12}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Sweets"
          value={dashboardStats?.sweets?.total || 0}
          change={8}
          icon={Package}
          color="green"
        />
        <StatCard
          title="Monthly Orders"
          value={dashboardStats?.sales?.monthlyOrders || 0}
          change={15}
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${dashboardStats?.sales?.monthlyRevenue?.toFixed(2) || '0.00'}`}
          change={22}
          icon={DollarSign}
          color="yellow"
        />
      </Grid>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Inventory Alerts */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Inventory Alerts</h3>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>

            <div className="space-y-4">
              {/* Out of Stock */}
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-900">
                    Out of Stock
                  </span>
                  <Badge variant="danger">
                    {inventoryStatus?.outOfStockCount || 0}
                  </Badge>
                </div>
                <p className="text-xs text-red-700 mt-1">
                  Items that need immediate restocking
                </p>
              </div>

              {/* Low Stock */}
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-yellow-900">
                    Low Stock
                  </span>
                  <Badge variant="warning">
                    {inventoryStatus?.lowStockCount || 0}
                  </Badge>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Items with less than 5 units remaining
                </p>
              </div>

              {/* Inventory Value */}
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-900">
                    Total Inventory Value
                  </span>
                  <span className="text-sm font-bold text-green-900">
                    ${inventoryStatus?.inventoryValue?.totalValue?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  {inventoryStatus?.inventoryValue?.totalItems || 0} total items
                </p>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => window.location.href = '/admin/inventory'}
            >
              View Full Inventory
            </Button>
          </Card>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => window.location.href = '/admin/orders'}
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {/* Sample orders - in real app, these would come from API */}
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Order #12{order}45</p>
                      <p className="text-xs text-gray-600">John Doe • 2 items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">$24.99</p>
                    <Badge variant="success" size="sm">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <Grid cols={4} gap={4}>
          <Button
            variant="outline"
            className="h-24 flex-col"
            onClick={() => window.location.href = '/admin/sweets/new'}
          >
            <Plus className="w-6 h-6 mb-2" />
            Add New Sweet
          </Button>
          <Button
            variant="outline"
            className="h-24 flex-col"
            onClick={() => window.location.href = '/admin/orders'}
          >
            <ShoppingBag className="w-6 h-6 mb-2" />
            Manage Orders
          </Button>
          <Button
            variant="outline"
            className="h-24 flex-col"
            onClick={() => window.location.href = '/admin/users'}
          >
            <Users className="w-6 h-6 mb-2" />
            User Management
          </Button>
          <Button
            variant="outline"
            className="h-24 flex-col"
            onClick={() => window.location.href = '/admin/analytics'}
          >
            <TrendingUp className="w-6 h-6 mb-2" />
            View Analytics
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default AdminDashboard;