import axiosInstance from './axiosInstance';

const healthNotificationService = {
  getAllNotifications: async () => {
    try {
      const response = await axiosInstance.get('/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications from health service:', error);
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
  }
};

export default healthNotificationService;