import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import toast from 'react-hot-toast';

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, updateTrip, deleteTrip } = useTrip();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const trip = trips.find(t => t.id === id);

  const [editData, setEditData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'planning'
  });

  useEffect(() => {
    if (trip) {
      setEditData({
        title: trip.title,
        destination: trip.destination,
        startDate: trip.startDate.toISOString().split('T')[0],
        endDate: trip.endDate.toISOString().split('T')[0],
        budget: trip.budget.toString(),
        status: trip.status
      });
    }
  }, [trip]);

  if (!trip) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Trip not found</h3>
        <p className="text-gray-600 mb-6">The trip you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await updateTrip(trip.id, {
        title: editData.title,
        destination: editData.destination,
        startDate: new Date(editData.startDate),
        endDate: new Date(editData.endDate),
        budget: parseInt(editData.budget),
        status: editData.status as any
      });
      setIsEditing(false);
      toast.success('Trip updated successfully!');
    } catch (error) {
      toast.error('Failed to update trip');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await deleteTrip(trip.id);
        toast.success('Trip deleted successfully!');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to delete trip');
        setIsDeleting(false);
      }
    }
  };

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const startDate = new Date(trip.startDate);
    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{trip.title}</h1>
          <p className="text-gray-600 mt-1">{trip.destination}</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-outline"
              >
                Edit Trip
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn-danger"
              >
                {isDeleting ? 'Deleting...' : 'Delete Trip'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Trip Status Banner */}
      {getDaysRemaining() > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-blue-600 text-xl mr-3">⏰</span>
            <div>
              <p className="font-medium text-blue-900">
                {getDaysRemaining()} days until your trip!
              </p>
              <p className="text-blue-700 text-sm">
                Start date: {formatDate(trip.startDate)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Trip Details */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip Details</h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Trip Title</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Destination</label>
                    <input
                      type="text"
                      value={editData.destination}
                      onChange={(e) => setEditData({...editData, destination: e.target.value})}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Start Date</label>
                    <input
                      type="date"
                      value={editData.startDate}
                      onChange={(e) => setEditData({...editData, startDate: e.target.value})}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input
                      type="date"
                      value={editData.endDate}
                      onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Budget (USD)</label>
                    <input
                      type="number"
                      value={editData.budget}
                      onChange={(e) => setEditData({...editData, budget: e.target.value})}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Status</label>
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({...editData, status: e.target.value})}
                      className="select"
                    >
                      <option value="planning">Planning</option>
                      <option value="booked">Booked</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Trip Title</label>
                    <p className="text-gray-900">{trip.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Destination</label>
                    <p className="text-gray-900">{trip.destination}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="text-gray-900">{formatDate(trip.startDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Date</label>
                    <p className="text-gray-900">{formatDate(trip.endDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Budget</label>
                    <p className="text-gray-900">${trip.budget.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Planning Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Planning</h2>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Trip Planning</h3>
                <p className="text-gray-600 mb-4">
                  Our AI agents will help you plan the perfect itinerary for your trip to {trip.destination}.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-primary-600">🏨 Hotel Agent</span>
                    <p className="text-gray-600">Finding best accommodations</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-secondary-600">🍽️ Food Agent</span>
                    <p className="text-gray-600">Discovering local cuisine</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-accent-600">🎯 Activity Agent</span>
                    <p className="text-gray-600">Planning attractions & experiences</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <span className="font-medium text-primary-600">🚗 Transport Agent</span>
                    <p className="text-gray-600">Optimizing travel routes</p>
                  </div>
                </div>
                <button className="btn-primary mt-4">
                  Start AI Planning
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">
                  {Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Budget</span>
                <span className="font-medium">
                  ${Math.round(trip.budget / Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                  {trip.status}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                📋 View Itinerary
              </button>
              <button className="w-full btn-outline">
                🏨 Book Hotels
              </button>
              <button className="w-full btn-outline">
                🍽️ Find Restaurants
              </button>
              <button className="w-full btn-outline">
                🎫 Book Activities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage; 