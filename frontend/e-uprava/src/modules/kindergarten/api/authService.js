import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const { accessToken, expiresIn, loggedId } = response.data;

      localStorage.setItem('kindergarten_token', accessToken);
      localStorage.setItem('kindergarten_userId', loggedId);
      localStorage.setItem('kindergarten_expiresIn', expiresIn);

      return response.data;
    } catch (error) {
      console.error('Kindergarten login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('kindergarten_token');
    localStorage.removeItem('kindergarten_userId');
    localStorage.removeItem('kindergarten_expiresIn');
  },

  getToken: () => localStorage.getItem('kindergarten_token'),

  isAuthenticated: () => !!localStorage.getItem('kindergarten_token')
};

export default authService;
