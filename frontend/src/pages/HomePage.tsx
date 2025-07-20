import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GlobeAltIcon, 
  SparklesIcon, 
  MapIcon, 
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Travel Planner</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="btn-outline">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Perfect Trip with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              AI Magic
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience intelligent travel planning powered by AI agents. Get personalized itineraries, 
            smart recommendations, and seamless coordination for your next adventure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Start Planning Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-4">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AI Travel Planner?
            </h2>
            <p className="text-lg text-gray-600">
              Discover the future of travel planning with our intelligent multi-agent system
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-hover p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Powered Planning
              </h3>
              <p className="text-gray-600">
                Intelligent agents create personalized itineraries based on your preferences
              </p>
            </div>
            
            <div className="card-hover p-6 text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapIcon className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart Recommendations
              </h3>
              <p className="text-gray-600">
                Get the best hotels, restaurants, and activities for your destination
              </p>
            </div>
            
            <div className="card-hover p-6 text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Global Coverage
              </h3>
              <p className="text-gray-600">
                Plan trips to any destination with comprehensive local insights
              </p>
            </div>
            
            <div className="card-hover p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Collaborative Planning
              </h3>
              <p className="text-gray-600">
                Plan trips together with friends and family in real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Travel Experience?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of travelers who are already using AI to plan their perfect trips
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-4">
            Get Started Free
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold">Travel Planner</span>
            </div>
            
            <div className="text-gray-400">
              © 2024 AI Travel Planner. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 