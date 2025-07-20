import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import toast from 'react-hot-toast';

const TripPlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrip();
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelStyle: 'budget'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      await createTrip({
        title: formData.title,
        destination: formData.destination,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        budget: parseInt(formData.budget),
        status: 'planning'
      });

      toast.success('Trip created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create trip');
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Trip</h1>
        <p className="text-gray-600">Let AI help you create the perfect travel itinerary</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trip Creation Form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Trip</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="label">Trip Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Tokyo Adventure"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="destination" className="label">Destination</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Tokyo, Japan"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="startDate" className="label">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="label">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="label">Budget (USD)</label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="input"
                    placeholder="2000"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="travelStyle" className="label">Travel Style</label>
                  <select
                    id="travelStyle"
                    name="travelStyle"
                    value={formData.travelStyle}
                    onChange={handleChange}
                    className="select"
                  >
                    <option value="budget">Budget</option>
                    <option value="luxury">Luxury</option>
                    <option value="adventure">Adventure</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="btn-primary"
                >
                  {isCreating ? 'Creating...' : 'Create Trip'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* AI Features Preview */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Features</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 text-sm font-bold">AI</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Smart Itinerary</h4>
                  <p className="text-sm text-gray-600">AI will create a personalized day-by-day plan</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary-600 text-sm font-bold">🏨</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Hotel Agent</h4>
                  <p className="text-sm text-gray-600">Find the best accommodations for your budget</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-600 text-sm font-bold">🍽️</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Food Agent</h4>
                  <p className="text-sm text-gray-600">Discover local restaurants and cuisine</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 text-sm font-bold">🎯</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Activity Agent</h4>
                  <p className="text-sm text-gray-600">Recommend attractions and experiences</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-600 mb-4">
              Advanced AI features will be available once the backend is connected:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Real-time weather integration</li>
              <li>• Budget optimization</li>
              <li>• Local transportation planning</li>
              <li>• Cultural insights and tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlannerPage; 