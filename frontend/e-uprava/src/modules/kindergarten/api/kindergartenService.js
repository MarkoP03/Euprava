import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const kindergartenService = {
  getAllKindergartens: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kindergartens`);
      return response.data;
    } catch (error) {
      console.error('Error fetching kindergartens:', error);
      throw error;
    }
  },

  getKindergartenById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kindergartens/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching kindergarten with id ${id}:`, error);
      throw error;
    }
  },

  createKindergarten: async (kindergartenData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/kindergartens`, kindergartenData);
      return response.data;
    } catch (error) {
      console.error('Error creating kindergarten:', error);
      throw error;
    }
  },

  updateKindergarten: async (id, kindergartenData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/kindergartens/${id}`, kindergartenData);
      return response.data;
    } catch (error) {
      console.error(`Error updating kindergarten with id ${id}:`, error);
      throw error;
    }
  },

  deleteKindergarten: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/kindergartens/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting kindergarten with id ${id}:`, error);
      throw error;
    }
  }
};

export default kindergartenService;