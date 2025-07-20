import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="card p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{user?.name || 'User'}</p>
            <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <p className="text-gray-500">Profile management coming soon.</p>
      </div>
    </div>
  );
};

export default ProfilePage; 