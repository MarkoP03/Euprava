import axiosInstance from './axiosInstance';

const enrollmentConfirmationService = {
  getAllEnrollmentConfirmations: async () => {
    try {
      const response = await axiosInstance.get('/enrollment-confirmations');
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollment confirmations:', error);
      throw error;
    }
  },

  getEnrollmentConfirmationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/enrollment-confirmations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching enrollment confirmation with id ${id}:`, error);
      throw error;
    }
  },

  createEnrollmentConfirmation: async (confirmationData) => {
    try {
      const response = await axiosInstance.post('/enrollment-confirmations', confirmationData);
      return response.data;
    } catch (error) {
      console.error('Error creating enrollment confirmation:', error);
      throw error;
    }
  },

  updateEnrollmentConfirmation: async (id, confirmationData) => {
    try {
      const response = await axiosInstance.put(`/enrollment-confirmations/${id}`, confirmationData);
      return response.data;
    } catch (error) {
      console.error(`Error updating enrollment confirmation with id ${id}:`, error);
      throw error;
    }
  },

  deleteEnrollmentConfirmation: async (id) => {
    try {
      await axiosInstance.delete(`/enrollment-confirmations/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting enrollment confirmation with id ${id}:`, error);
      throw error;
    }
  }
};

export default enrollmentConfirmationService;
