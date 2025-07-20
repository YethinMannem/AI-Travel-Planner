import React, { createContext, useContext, useReducer } from 'react';

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  status: 'planning' | 'booked' | 'ongoing' | 'completed';
}

interface TripState {
  trips: Trip[];
  currentTrip: Trip | null;
  isLoading: boolean;
}

type TripAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TRIPS'; payload: Trip[] }
  | { type: 'ADD_TRIP'; payload: Trip }
  | { type: 'UPDATE_TRIP'; payload: Trip }
  | { type: 'DELETE_TRIP'; payload: string }
  | { type: 'SET_CURRENT_TRIP'; payload: Trip | null };

// Mock trip data
const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-22'),
    budget: 2500,
    status: 'planning'
  },
  {
    id: '2',
    title: 'Paris Getaway',
    destination: 'Paris, France',
    startDate: new Date('2024-04-10'),
    endDate: new Date('2024-04-17'),
    budget: 1800,
    status: 'booked'
  },
  {
    id: '3',
    title: 'New York City',
    destination: 'New York, USA',
    startDate: new Date('2024-05-20'),
    endDate: new Date('2024-05-27'),
    budget: 2200,
    status: 'planning'
  },
  {
    id: '4',
    title: 'Bali Retreat',
    destination: 'Bali, Indonesia',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-06-25'),
    budget: 1500,
    status: 'completed'
  }
];

const initialState: TripState = {
  trips: [],
  currentTrip: null,
  isLoading: false,
};

const tripReducer = (state: TripState, action: TripAction): TripState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_TRIPS':
      return {
        ...state,
        trips: action.payload,
      };
    case 'ADD_TRIP':
      return {
        ...state,
        trips: [...state.trips, action.payload],
      };
    case 'UPDATE_TRIP':
      return {
        ...state,
        trips: state.trips.map(trip => 
          trip.id === action.payload.id ? action.payload : trip
        ),
        currentTrip: state.currentTrip?.id === action.payload.id ? action.payload : state.currentTrip,
      };
    case 'DELETE_TRIP':
      return {
        ...state,
        trips: state.trips.filter(trip => trip.id !== action.payload),
        currentTrip: state.currentTrip?.id === action.payload ? null : state.currentTrip,
      };
    case 'SET_CURRENT_TRIP':
      return {
        ...state,
        currentTrip: action.payload,
      };
    default:
      return state;
  }
};

interface TripContextType extends TripState {
  fetchTrips: () => Promise<void>;
  createTrip: (tripData: Omit<Trip, 'id'>) => Promise<void>;
  updateTrip: (id: string, tripData: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  setCurrentTrip: (trip: Trip | null) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: React.ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  const fetchTrips = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    dispatch({ type: 'SET_TRIPS', payload: mockTrips });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const createTrip = async (tripData: Omit<Trip, 'id'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
    };
    
    dispatch({ type: 'ADD_TRIP', payload: newTrip });
  };

  const updateTrip = async (id: string, tripData: Partial<Trip>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingTrip = state.trips.find(trip => trip.id === id);
    if (existingTrip) {
      const updatedTrip = { ...existingTrip, ...tripData };
      dispatch({ type: 'UPDATE_TRIP', payload: updatedTrip });
    }
  };

  const deleteTrip = async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    dispatch({ type: 'DELETE_TRIP', payload: id });
  };

  const setCurrentTrip = (trip: Trip | null) => {
    dispatch({ type: 'SET_CURRENT_TRIP', payload: trip });
  };

  const value: TripContextType = {
    ...state,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    setCurrentTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}; 