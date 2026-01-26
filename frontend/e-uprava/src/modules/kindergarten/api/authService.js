import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    });

    const { accessToken, expiresIn, loggedId } = response.data;

    localStorage.setItem('kindergarten_token', accessToken);
    localStorage.setItem('kindergarten_userId', loggedId);
    localStorage.setItem('kindergarten_expiresIn', expiresIn);

    return response.data;
  },

  register: async (userData) => {
    const formData = new FormData();

    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });

    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      formData
    );

    return response.data;
  },

  logout: () => {
    localStorage.clear();
  },

  getToken: () => localStorage.getItem('kindergarten_token')
};

export default authService;
