import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const childService = {
  getAllChildren: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/children`);
      return response.data;
    } catch (error) {
      console.error('Error fetching children:', error);
      throw error;
    }
  },

  getChildById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/children/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching child with id ${id}:`, error);
      throw error;
    }
  },

  createChild: async (childData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/children`, childData);
      return response.data;
    } catch (error) {
      console.error('Error creating child:', error);
      throw error;
    }
  },

  updateChild: async (id, childData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/children/${id}`, childData);
      return response.data;
    } catch (error) {
      console.error(`Error updating child with id ${id}:`, error);
      throw error;
    }
  },

  deleteChild: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/children/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting child with id ${id}:`, error);
      throw error;
    }
  }
};

export default childService;