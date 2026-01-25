import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const doctorReportService = {
  getAllDoctorReports: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctor-reports`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor reports:', error);
      throw error;
    }
  },

  getDoctorReportById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctor-reports/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor report with id ${id}:`, error);
      throw error;
    }
  },

  createDoctorReport: async (reportData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/doctor-reports`, reportData);
      return response.data;
    } catch (error) {
      console.error('Error creating doctor report:', error);
      throw error;
    }
  },

  updateDoctorReport: async (id, reportData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/doctor-reports/${id}`, reportData);
      return response.data;
    } catch (error) {
      console.error(`Error updating doctor report with id ${id}:`, error);
      throw error;
    }
  },

  deleteDoctorReport: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/doctor-reports/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting doctor report with id ${id}:`, error);
      throw error;
    }
  }
};

export default doctorReportService;