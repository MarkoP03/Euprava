import axios from './axiosInstance';

const allergyService = {
  getAllAllergies: async () => {
    try {
      const response = await axios.get('/allergies');
      return response.data;
    } catch (error) {
      console.error('Error fetching allergies:', error);
      throw error;
    }
  },

  getAllergyById: async (id) => {
    try {
      const response = await axios.get(`/allergies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching allergy with id ${id}:`, error);
      throw error;
    }
  },

  createAllergy: async (allergyData) => {
    try {
      const response = await axios.post('/allergies', allergyData);
      return response.data;
    } catch (error) {
      console.error('Error creating allergy:', error);
      throw error;
    }
  },

  updateAllergy: async (id, allergyData) => {
    try {
      const response = await axios.put(`/allergies/${id}`, allergyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating allergy with id ${id}:`, error);
      throw error;
    }
  },

  deleteAllergy: async (id) => {
    try {
      await axios.delete(`/allergies/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting allergy with id ${id}:`, error);
      throw error;
    }
  }
};

export default allergyService;
