import axios from 'axios';

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
    localStorage.clear();
  },

  getToken: () => localStorage.getItem('health_token')
};

export default authService;
