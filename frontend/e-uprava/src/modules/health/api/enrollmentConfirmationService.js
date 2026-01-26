import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const enrollmentConfirmationService = {
  getAllEnrollmentConfirmations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enrollment-confirmations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollment confirmations:', error);
      throw error;
    }
  },

  getEnrollmentConfirmationById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enrollment-confirmations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching enrollment confirmation with id ${id}:`, error);
      throw error;
    }
  },

  createEnrollmentConfirmation: async (confirmationData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/enrollment-confirmations`, confirmationData);
      return response.data;
    } catch (error) {
      console.error('Error creating enrollment confirmation:', error);
      throw error;
    }
  },

  updateEnrollmentConfirmation: async (id, confirmationData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/enrollment-confirmations/${id}`, confirmationData);
      return response.data;
    } catch (error) {
      console.error(`Error updating enrollment confirmation with id ${id}:`, error);
      throw error;
    }
  },

  deleteEnrollmentConfirmation: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/enrollment-confirmations/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting enrollment confirmation with id ${id}:`, error);
      throw error;
    }
  }
};

export default enrollmentConfirmationService;