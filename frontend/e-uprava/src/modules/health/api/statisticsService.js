import axios from './axiosInstance';

const statisticsService = {
  getStatistics: async () => {
    try {
      const response = await axios.get('/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching allergies:', error);
      throw error;
    }
  },

  
};

export default statisticsService;
