import axiosInstance from './axiosInstance';

const doctorReportService = {
  getAllDoctorReports: async () => {
    try {
      const response = await axiosInstance.get('/doctor-reports');
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor reports:', error);
      throw error;
    }
  },

  getDoctorReportById: async (id) => {
    try {
      const response = await axiosInstance.get(`/doctor-reports/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor report with id ${id}:`, error);
      throw error;
    }
  },

  createDoctorReport: async (reportData) => {
    try {
      const response = await axiosInstance.post('/doctor-reports', reportData);
      return response.data;
    } catch (error) {
      console.error('Error creating doctor report:', error);
      throw error;
    }
  },

  updateDoctorReport: async (id, reportData) => {
    try {
      const response = await axiosInstance.put(`/doctor-reports/${id}`, reportData);
      return response.data;
    } catch (error) {
      console.error(`Error updating doctor report with id ${id}:`, error);
      throw error;
    }
  },

  deleteDoctorReport: async (id) => {
    try {
      await axiosInstance.delete(`/doctor-reports/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting doctor report with id ${id}:`, error);
      throw error;
    }
  }
};

export default doctorReportService;
