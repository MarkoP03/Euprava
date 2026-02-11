import axiosInstance from './axiosInstance';

const notificationService = {
  getAllNotifications: async () => {
    try {
      const response = await axiosInstance.get('/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  getNotificationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching notification with id ${id}:`, error);
      throw error;
    }
  },

  createNotification: async (notificationData) => {
    try {
      const response = await axiosInstance.post('/notifications', notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  updateNotification: async (id, notificationData) => {
    try {
      const response = await axiosInstance.put(`/notifications/${id}`, notificationData);
      return response.data;
    } catch (error) {
      console.error(`Error updating notification with id ${id}:`, error);
      throw error;
    }
  },

  deleteNotification: async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting notification with id ${id}:`, error);
      throw error;
    }
  }
};

export default notificationService;
