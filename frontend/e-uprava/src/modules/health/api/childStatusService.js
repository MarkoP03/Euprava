import axiosInstance from './axiosInstance';

const childStatusService = {
  suspendChild: async (childId) => {
    try {
      const response = await axiosInstance.put(`/children/${childId}/suspend`);
      return response.data;
    } catch (error) {
      console.error(`Error suspending child ${childId}:`, error);
      throw error;
    }
  },

  reactivateChild: async (childId) => {
    try {
      const response = await axiosInstance.put(`/children/${childId}/reactivate`);
      return response.data;
    } catch (error) {
      console.error(`Error reactivating child ${childId}:`, error);
      throw error;
    }
  }
};

export default childStatusService;