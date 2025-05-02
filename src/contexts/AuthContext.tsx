import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserType } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType: UserType) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            ...state,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to authenticate',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // This would be an API call in a real application
      // Simulating API response for demo purposes
      const mockUser: User = {
        id: '123',
        email,
        name: email.split('@')[0],
        userType: email.includes('company') ? 'company' : 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Store the user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Redirect based on user type
      if (mockUser.userType === 'student') {
        navigate('/student/dashboard');
      } else if (mockUser.userType === 'company') {
        navigate('/company/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Invalid email or password',
      });
    }
  };

  const register = async (email: string, password: string, name: string, userType: UserType) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // This would be an API call in a real application
      // Simulating API response for demo purposes
      const mockUser: User = {
        id: '123',
        email,
        name,
        userType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Store the user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Redirect based on user type
      if (userType === 'student') {
        navigate('/student/profile');
      } else if (userType === 'company') {
        navigate('/company/profile');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Registration failed',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    navigate('/');
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setState({ ...state, isLoading: true });
      
      // In a real app, this would be an API call
      const updatedUser = { ...state.user, ...userData, updatedAt: new Date().toISOString() } as User;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setState({
        ...state,
        user: updatedUser,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to update user:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to update user information',
      });
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};