import axiosInstance from './axiosInstance';

const enrollmentService = {
  getAllEnrollments: async () => {
    try {
      const response = await axiosInstance.get('/enrollments');
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }
  },

  getEnrollmentById: async (id) => {
    try {
      const response = await axiosInstance.get(`/enrollments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching enrollment with id ${id}:`, error);
      throw error;
    }
  },

  createEnrollment: async (enrollmentData) => {
    try {
      const response = await axiosInstance.post('/enrollments', enrollmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating enrollment:', error);
      throw error;
    }
  },

  updateEnrollment: async (id, enrollmentData) => {
    try {
      const response = await axiosInstance.put(`/enrollments/${id}`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating enrollment with id ${id}:`, error);
      throw error;
    }
  },

  deleteEnrollment: async (id) => {
    try {
      await axiosInstance.delete(`/enrollments/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting enrollment with id ${id}:`, error);
      throw error;
    }
  }
};

export default enrollmentService;
