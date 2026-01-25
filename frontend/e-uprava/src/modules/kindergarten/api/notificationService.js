import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const notificationService = {
  getAllNotifications: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  getNotificationById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching notification with id ${id}:`, error);
      throw error;
    }
  },

  createNotification: async (notificationData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notifications`, notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  updateNotification: async (id, notificationData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/notifications/${id}`, notificationData);
      return response.data;
    } catch (error) {
      console.error(`Error updating notification with id ${id}:`, error);
      throw error;
    }
  },

  deleteNotification: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notifications/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting notification with id ${id}:`, error);
      throw error;
    }
  }
};

export default notificationService;