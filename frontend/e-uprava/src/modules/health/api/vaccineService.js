import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

// Renamed to match component: VaccineManagement uses "vaccines" not "vaccinations"
const vaccineService = {
  getAllVaccines: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vaccines`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vaccines:', error);
      throw error;
    }
  },

  getVaccineById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vaccines/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vaccine with id ${id}:`, error);
      throw error;
    }
  },

  createVaccine: async (vaccineData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/vaccines`, vaccineData);
      return response.data;
    } catch (error) {
      console.error('Error creating vaccine:', error);
      throw error;
    }
  },

  updateVaccine: async (id, vaccineData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/vaccines/${id}`, vaccineData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vaccine with id ${id}:`, error);
      throw error;
    }
  },

  deleteVaccine: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/vaccines/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting vaccine with id ${id}:`, error);
      throw error;
    }
  }
};

export default vaccineService;