import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const reportOfIllnessService = {
  getAllReportOfIllnesses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/report-of-illnesses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching report of illnesses:', error);
      throw error;
    }
  },

  getReportOfIllnessById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/report-of-illnesses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching report of illness with id ${id}:`, error);
      throw error;
    }
  },

  createReportOfIllness: async (reportData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/report-of-illnesses`, reportData);
      return response.data;
    } catch (error) {
      console.error('Error creating report of illness:', error);
      throw error;
    }
  },

  updateReportOfIllness: async (id, reportData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/report-of-illnesses/${id}`, reportData);
      return response.data;
    } catch (error) {
      console.error(`Error updating report of illness with id ${id}:`, error);
      throw error;
    }
  },

  deleteReportOfIllness: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/report-of-illnesses/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting report of illness with id ${id}:`, error);
      throw error;
    }
  }
};

export default reportOfIllnessService;