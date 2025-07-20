import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

// Components
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TripPlannerPage from './pages/TripPlanner/TripPlannerPage';
import TripDetailPage from './pages/TripDetail/TripDetailPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Styles
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TripProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <DashboardPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/planner"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <TripPlannerPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/trip/:id"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <TripDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <ProfilePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                {/* Catch all route */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              
              {/* Global toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </TripProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 