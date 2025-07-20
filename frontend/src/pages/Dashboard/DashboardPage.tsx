import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { trips, fetchTrips, isLoading } = useTrip();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    planning: 0,
    booked: 0,
    completed: 0
  });

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    const newStats = {
      total: trips.length,
      planning: trips.filter(trip => trip.status === 'planning').length,
      booked: trips.filter(trip => trip.status === 'booked').length,
      completed: trips.filter(trip => trip.status === 'completed').length
    };
    setStats(newStats);
  }, [trips]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || 'Traveler'}! 👋
        </h1>
        <p className="text-primary-100">
          Ready to plan your next adventure? Let AI help you create the perfect trip.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <span className="text-primary-600 text-xl">✈️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Planning</p>
              <p className="text-2xl font-bold text-gray-900">{stats.planning}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Booked</p>
              <p className="text-2xl font-bold text-gray-900">{stats.booked}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">🎉</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/planner"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="p-2 bg-primary-100 rounded-lg mr-3">
              <span className="text-primary-600">➕</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Create New Trip</h3>
              <p className="text-sm text-gray-600">Start planning your next adventure</p>
            </div>
          </Link>

          <Link
            to="/planner"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition-colors"
          >
            <div className="p-2 bg-secondary-100 rounded-lg mr-3">
              <span className="text-secondary-600">🤖</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">AI Trip Planner</h3>
              <p className="text-sm text-gray-600">Let AI create your itinerary</p>
            </div>
          </Link>

          <Link
            to="/profile"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-accent-300 hover:bg-accent-50 transition-colors"
          >
            <div className="p-2 bg-accent-100 rounded-lg mr-3">
              <span className="text-accent-600">👤</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">View Profile</h3>
              <p className="text-sm text-gray-600">Manage your account settings</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Trips</h2>
          <Link
            to="/planner"
            className="btn-primary"
          >
            Create New Trip
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-6">Start planning your first adventure!</p>
            <Link to="/planner" className="btn-primary">
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Link
                key={trip.id}
                to={`/trip/${trip.id}`}
                className="block group"
              >
                <div className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {trip.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      {trip.destination}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">💰</span>
                      ${trip.budget.toLocaleString()}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-primary-600 text-sm font-medium">
                      View Details
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 