import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const medicalRecordService = {
  getAllMedicalRecords: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medical-records`);
      return response.data;
    } catch (error) {
      console.error('Error fetching medical records:', error);
      throw error;
    }
  },

  getMedicalRecordById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medical-records/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medical record with id ${id}:`, error);
      throw error;
    }
  },

  createMedicalRecord: async (medicalRecordData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/medical-records`, medicalRecordData);
      return response.data;
    } catch (error) {
      console.error('Error creating medical record:', error);
      throw error;
    }
  },

  updateMedicalRecord: async (id, medicalRecordData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/medical-records/${id}`, medicalRecordData);
      return response.data;
    } catch (error) {
      console.error(`Error updating medical record with id ${id}:`, error);
      throw error;
    }
  },

  deleteMedicalRecord: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/medical-records/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting medical record with id ${id}:`, error);
      throw error;
    }
  }
};

export default medicalRecordService;