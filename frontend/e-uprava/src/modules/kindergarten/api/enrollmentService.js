import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const enrollmentService = {
  getAllEnrollments: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enrollments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }
  },

  getEnrollmentById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enrollments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching enrollment with id ${id}:`, error);
      throw error;
    }
  },

  createEnrollment: async (enrollmentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/enrollments`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating enrollment:', error);
      throw error;
    }
  },

  updateEnrollment: async (id, enrollmentData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/enrollments/${id}`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating enrollment with id ${id}:`, error);
      throw error;
    }
  },

  deleteEnrollment: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/enrollments/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting enrollment with id ${id}:`, error);
      throw error;
    }
  }
};

export default enrollmentService;