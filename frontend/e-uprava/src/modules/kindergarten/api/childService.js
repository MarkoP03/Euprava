import axiosInstance from './axiosInstance';

const childService = {
  getAllChildren: async () => {
    try {
      const response = await axiosInstance.get('/children');
      return response.data;
    } catch (error) {
      console.error('Error fetching children:', error);
      throw error;
    }
  },

  getChildById: async (id) => {
    try {
      const response = await axiosInstance.get(`/children/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching child with id ${id}:`, error);
      throw error;
    }
  },

  createChild: async (childData) => {
    try {
      const response = await axiosInstance.post('/children', childData);
      return response.data;
    } catch (error) {
      console.error('Error creating child:', error);
      throw error;
    }
  },

  updateChild: async (id, childData) => {
    try {
      const response = await axiosInstance.put(`/children/${id}`, childData);
      return response.data;
    } catch (error) {
      console.error(`Error updating child with id ${id}:`, error);
      throw error;
    }
  },

  deleteChild: async (id) => {
    try {
      await axiosInstance.delete(`/children/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting child with id ${id}:`, error);
      throw error;
    }
  },

  getAllergiesByChild: async (childId) => {
    try {
      const response = await axiosInstance.get(`/children/${childId}/allergies`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching allergies for child ${childId}:`, error);
      throw error;
    }
  },
  getIllnessReportsByChild: async (childId) => {
    try {
      const response = await axiosInstance.get(`/children/${childId}/illness-reports`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching illness reports for child ${childId}:`, error);
      throw error;
    }
  },

  createIllnessReport: async (childId, reportData) => {
    try {
      const response = await axiosInstance.post(`/children/${childId}/illness-reports`, reportData);
      return response.data;
    } catch (error) {
      console.error(`Error creating illness report for child ${childId}:`, error);
      throw error;
    }
  }

};



export default childService;