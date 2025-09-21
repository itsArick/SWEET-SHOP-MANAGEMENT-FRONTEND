import React, { useState } from 'react';
import { User, Mail, Shield, Key, Edit2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useForm, validationRules } from '../../hooks/useForm';
import PageHeader from '../../components/layout/PageHeader';
import Card, { CardHeader, CardBody } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // Profile form
  const profileForm = useForm(
    { username: user?.username || '', email: user?.email || '' },
    {
      username: [
        validationRules.required(),
        validationRules.minLength(3, 'Username must be at least 3 characters'),
      ],
      email: [validationRules.required(), validationRules.email()],
    }
  );

  // Password form
  const passwordForm = useForm(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    {
      currentPassword: [validationRules.required()],
      newPassword: [
        validationRules.required(),
        validationRules.minLength(6, 'Password must be at least 6 characters'),
      ],
      confirmPassword: [
        validationRules.required(),
        validationRules.matchField('newPassword', 'Passwords do not match'),
      ],
    }
  );

  const handleProfileUpdate = async (formData) => {
    setUpdateMessage('');
    const result = await updateProfile(formData);
    
    if (result.success) {
      setEditMode(false);
      setUpdateMessage('Profile updated successfully!');
    }
  };

  const handlePasswordChange = async (formData) => {
    const { confirmPassword, ...passwordData } = formData;
    const result = await changePassword(passwordData);
    
    if (result.success) {
      setShowPasswordModal(false);
      passwordForm.resetForm();
      setUpdateMessage('Password changed successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    profileForm.resetForm();
  };

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Manage your account settings and preferences"
        breadcrumbs={[{ label: 'My Profile' }]}
        actions={[
          {
            label: editMode ? 'Cancel' : 'Edit Profile',
            variant: editMode ? 'outline' : 'primary',
            icon: editMode ? undefined : Edit2,
            onClick: editMode ? handleCancelEdit : () => setEditMode(true)
          }
        ]}
      />

      {updateMessage && (
        <Alert type="success" className="mb-6" onClose={() => setUpdateMessage('')}>
          {updateMessage}
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </CardHeader>
            <CardBody>
              {editMode ? (
                <form
                  onSubmit={(e) => profileForm.handleSubmit(e, handleProfileUpdate)}
                  className="space-y-6"
                >
                  <Input
                    label="Username"
                    name="username"
                    icon={User}
                    value={profileForm.values.username}
                    onChange={profileForm.handleChange}
                    onBlur={profileForm.handleBlur}
                    error={profileForm.errors.username}
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    icon={Mail}
                    value={profileForm.values.email}
                    onChange={profileForm.handleChange}
                    onBlur={profileForm.handleBlur}
                    error={profileForm.errors.email}
                    required
                  />

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                      loading={profileForm.isSubmitting}
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-xl">
                        {user?.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {user?.username}
                      </h3>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user?.username}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user?.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <Badge
                          variant={user?.role === 'admin' ? 'primary' : 'default'}
                          className="capitalize"
                        >
                          {user?.role}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <span className="text-gray-900">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Account Security */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Account Security</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Password</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Keep your account secure with a strong password.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Key}
                  onClick={() => setShowPasswordModal(true)}
                >
                  Change Password
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Last Login</h4>
                <p className="text-sm text-gray-600">
                  {user?.lastLogin 
                    ? new Date(user.lastLogin).toLocaleString()
                    : 'Never'
                  }
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Quick Stats</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold">$156.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Favorite Category</span>
                  <span className="font-semibold capitalize">Chocolate</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        size="md"
      >
        <form
          onSubmit={(e) => passwordForm.handleSubmit(e, handlePasswordChange)}
          className="space-y-6"
        >
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={passwordForm.values.currentPassword}
            onChange={passwordForm.handleChange}
            onBlur={passwordForm.handleBlur}
            error={passwordForm.errors.currentPassword}
            required
          />

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordForm.values.newPassword}
            onChange={passwordForm.handleChange}
            onBlur={passwordForm.handleBlur}
            error={passwordForm.errors.newPassword}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwordForm.values.confirmPassword}
            onChange={passwordForm.handleChange}
            onBlur={passwordForm.handleBlur}
            error={passwordForm.errors.confirmPassword}
            required
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={passwordForm.isSubmitting}
              className="flex-1"
            >
              Change Password
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPasswordModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;