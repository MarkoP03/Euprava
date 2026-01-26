import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const { accessToken, expiresIn, loggedId } = response.data;

      // čuvamo TAČNO šta backend vraća
      localStorage.setItem('health_token', accessToken);
      localStorage.setItem('health_userId', loggedId);
      localStorage.setItem('health_expiresIn', expiresIn);

      return response.data;
    } catch (error) {
      console.error('Health login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('health_token');
    localStorage.removeItem('health_userId');
    localStorage.removeItem('health_expiresIn');
  },

  getToken: () => localStorage.getItem('health_token'),

  isAuthenticated: () => !!localStorage.getItem('health_token')
};

export default authService;
