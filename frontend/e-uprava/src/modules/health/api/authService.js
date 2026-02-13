import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_BASE_URL = 'http://localhost:8081/api';

const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password
    });

    const { accessToken, expiresIn, loggedId } = response.data;

    localStorage.setItem('health_token', accessToken);
    localStorage.setItem('health_userId', loggedId);
    localStorage.setItem('health_expiresIn', expiresIn);

    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      userData, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('health_token');
    localStorage.removeItem('health_userId');
    localStorage.removeItem('health_expiresIn');
    localStorage.removeItem('currentUser');
  },

  getToken: () => localStorage.getItem('health_token'),

  whoami: async () => {
    try {
      const response = await axiosInstance.get('/users/whoami');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  getCurrentUserRole: () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.role;
    }
    return null;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  setCurrentUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

};

export default authService;