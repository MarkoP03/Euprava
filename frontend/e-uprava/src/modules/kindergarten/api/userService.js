import axiosInstance from './axiosInstance';

const userService = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  getTeachers: async () => {
    try {
      const response = await axiosInstance.get('/users/teachers');
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
};

export default userService;
