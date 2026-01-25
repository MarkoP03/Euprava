import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const allergyService = {
  getAllAllergies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allergies`);
      return response.data;
    } catch (error) {
      console.error('Error fetching allergies:', error);
      throw error;
    }
  },

  getAllergyById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allergies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching allergy with id ${id}:`, error);
      throw error;
    }
  },

  createAllergy: async (allergyData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/allergies`, allergyData);
      return response.data;
    } catch (error) {
      console.error('Error creating allergy:', error);
      throw error;
    }
  },

  updateAllergy: async (id, allergyData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/allergies/${id}`, allergyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating allergy with id ${id}:`, error);
      throw error;
    }
  },

  deleteAllergy: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/allergies/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting allergy with id ${id}:`, error);
      throw error;
    }
  }
};

export default allergyService;