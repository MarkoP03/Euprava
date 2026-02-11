import axiosInstance from './axiosInstance';

const enrollmentService = {
  getAllEnrollments: async () => {
    try {
      const response = await axiosInstance.get('/enrollment');
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }
  },

  getEnrollmentById: async (id) => {
    try {
      const response = await axiosInstance.get(`/enrollment/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching enrollment with id ${id}:`, error);
      throw error;
    }
  },

   getEnrollmentsByKindergarten: async (kindergartenId) => {
    try {
      const response = await axiosInstance.get(
        `/enrollment/kindergarten/${kindergartenId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching enrollments for kindergarten ${kindergartenId}:`,
        error
      );
      throw error;
    }
  },

  createEnrollment: async (enrollmentData) => {
    try {
      const response = await axiosInstance.post('/enrollment', enrollmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating enrollment:', error);
      throw error;
    }
  },

  updateEnrollment: async (id, enrollmentData) => {
    try {
      const response = await axiosInstance.put(`/enrollment/${id}`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating enrollment with id ${id}:`, error);
      throw error;
    }
  },

  deleteEnrollment: async (id) => {
    try {
      await axiosInstance.delete(`/enrollment/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting enrollment with id ${id}:`, error);
      throw error;
    }
  }
};

export default enrollmentService;
