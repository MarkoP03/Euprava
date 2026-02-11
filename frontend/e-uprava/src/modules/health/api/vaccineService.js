import axiosInstance from './axiosInstance';

const vaccineService = {
  getAllVaccines: async () => {
    try {
      const response = await axiosInstance.get('/vaccines');
      return response.data;
    } catch (error) {
      console.error('Error fetching vaccines:', error);
      throw error;
    }
  },

  getVaccineById: async (id) => {
    try {
      const response = await axiosInstance.get(`/vaccines/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vaccine with id ${id}:`, error);
      throw error;
    }
  },

  createVaccine: async (vaccineData) => {
    try {
      const response = await axiosInstance.post('/vaccines', vaccineData);
      return response.data;
    } catch (error) {
      console.error('Error creating vaccine:', error);
      throw error;
    }
  },

  updateVaccine: async (id, vaccineData) => {
    try {
      const response = await axiosInstance.put(`/vaccines/${id}`, vaccineData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vaccine with id ${id}:`, error);
      throw error;
    }
  },

  deleteVaccine: async (id) => {
    try {
      await axiosInstance.delete(`/vaccines/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting vaccine with id ${id}:`, error);
      throw error;
    }
  }
};

export default vaccineService;
