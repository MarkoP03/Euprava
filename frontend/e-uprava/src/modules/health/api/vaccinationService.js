import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const vaccinationService = {
  getAllVaccinations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vaccinations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
      throw error;
    }
  },

  getVaccinationById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vaccinations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vaccination with id ${id}:`, error);
      throw error;
    }
  },

  createVaccination: async (vaccinationData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/vaccinations`, vaccinationData);
      return response.data;
    } catch (error) {
      console.error('Error creating vaccination:', error);
      throw error;
    }
  },

  updateVaccination: async (id, vaccinationData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/vaccinations/${id}`, vaccinationData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vaccination with id ${id}:`, error);
      throw error;
    }
  },

  deleteVaccination: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/vaccinations/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting vaccination with id ${id}:`, error);
      throw error;
    }
  }
};

export default vaccinationService;