import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Users, Package, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSweets } from '../hooks/useSweets';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { SweetCard } from '../components/sweets';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Section, Grid } from '../components/layout';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { getFeaturedSweets } = useSweets();
  const [featuredSweets, setFeaturedSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loadFeaturedSweets = async () => {
  //     const result = await getFeaturedSweets(6);
  //     if (result.success) {
  //       setFeaturedSweets(result.data);
  //     }
  //     setLoading(false);
  //   };

  //   loadFeaturedSweets();
  // }, [getFeaturedSweets]);


useEffect(() => {
  const loadFeaturedSweets = async () => {
    const result = await getFeaturedSweets(6);
    if (result.success) {
      setFeaturedSweets(result.data);
    }
    setLoading(false);
  };

  loadFeaturedSweets();
}, []);


  const stats = [
    { label: 'Sweet Varieties', value: '500+', icon: Package },
    { label: 'Happy Customers', value: '10K+', icon: Users },
    { label: 'Daily Orders', value: '200+', icon: TrendingUp },
    { label: 'Customer Rating', value: '4.9', icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section background="transparent" padding="xl" className="bg-gradient-to-br from-pink-50 via-white to-yellow-50">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-4xl">🍭</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Sweet Shop</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the finest collection of handcrafted sweets and treats. 
              From traditional favorites to modern delights, we have something for every sweet tooth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {isAuthenticated ? (
              <>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/sweets')}
                  icon={Package}
                >
                  Browse Sweets
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/orders')}
                >
                  My Orders
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  icon={ArrowRight}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/sweets')}
                >
                  Browse Sweets
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-sm bg-white/60 backdrop-blur-sm">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Sweets */}
      <Section background="white" padding="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Sweets
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our most popular and delicious treats, loved by customers worldwide
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading featured sweets..." />
          </div>
        ) : featuredSweets.length > 0 ? (
          <>
            <Grid cols={3} gap={6}>
              {featuredSweets.map((sweet) => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  onView={(sweet) => navigate(`/sweets/${sweet._id}`)}
                />
              ))}
            </Grid>
            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/sweets')}
                icon={ArrowRight}
              >
                View All Sweets
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured sweets available at the moment.</p>
          </div>
        )}
      </Section>

      {/* Features Section */}
      <Section background="gray" padding="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Sweet Shop?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to bringing you the best sweet experience possible
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
            <p className="text-gray-600">
              Only the finest ingredients sourced from trusted suppliers worldwide. 
              Every sweet is crafted with care and attention to detail.
            </p>
          </Card>

          <Card className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery to your doorstep. Fresh sweets delivered 
              within 24 hours of your order.
            </p>
          </Card>

          <Card className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
            <p className="text-gray-600">
              Your happiness is our priority. 100% satisfaction guarantee with 
              easy returns and excellent customer support.
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <Section background="primary" padding="lg" className="bg-gradient-to-r from-pink-600 to-yellow-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Sweet Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover your new favorite treats today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-white text-pink-600 border-white hover:bg-gray-100"
              >
                Sign Up Now
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/sweets')}
                className="text-white border-white hover:bg-white/10"
              >
                Browse Sweets
              </Button>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
};

export default Home;