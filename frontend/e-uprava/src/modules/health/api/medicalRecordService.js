import axiosInstance from './axiosInstance';

const medicalRecordService = {
  getAllMedicalRecords: async () => {
    try {
      const response = await axiosInstance.get('/medical-records');
      return response.data;
    } catch (error) {
      console.error('Error fetching medical records:', error);
      throw error;
    }
  },

  getMedicalRecordById: async (id) => {
    try {
      const response = await axiosInstance.get(`/medical-records/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medical record with id ${id}:`, error);
      throw error;
    }
  },

  createMedicalRecord: async (medicalRecordData) => {
    try {
      const response = await axiosInstance.post('/medical-records', medicalRecordData);
      return response.data;
    } catch (error) {
      console.error('Error creating medical record:', error);
      throw error;
    }
  },

  updateMedicalRecord: async (id, medicalRecordData) => {
    try {
      const response = await axiosInstance.put(`/medical-records/${id}`, medicalRecordData);
      return response.data;
    } catch (error) {
      console.error(`Error updating medical record with id ${id}:`, error);
      throw error;
    }
  },

  deleteMedicalRecord: async (id) => {
    try {
      await axiosInstance.delete(`/medical-records/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting medical record with id ${id}:`, error);
      throw error;
    }
  }
};

export default medicalRecordService;
