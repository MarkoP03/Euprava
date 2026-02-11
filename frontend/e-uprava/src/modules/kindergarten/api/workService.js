// src/features/works/api/worksService.js
import axiosInstance from './axiosInstance';

const worksService = {
  getAllWorks: async () => {
    try {
      const response = await axiosInstance.get('/works');
      return response.data;
    } catch (error) {
      console.error('Error fetching works:', error);
      throw error;
    }
  },

  getWorkById: async (id) => {
    try {
      const response = await axiosInstance.get(`/works/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching work with id ${id}:`, error);
      throw error;
    }
  },

  getWorksByKindergarten: async (kindergartenId) => {
    try {
      const response = await axiosInstance.get(`/works/kindergarten/${kindergartenId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching works for kindergarten ${kindergartenId}:`, error);
      throw error;
    }
  },

  createWork: async (workData) => {
    try {
      const response = await axiosInstance.post('/works', workData);
      return response.data;
    } catch (error) {
      console.error('Error creating work:', error);
      throw error;
    }
  },

  updateWork: async (id, workData) => {
    try {
      const response = await axiosInstance.put(`/works/${id}`, workData);
      return response.data;
    } catch (error) {
      console.error(`Error updating work with id ${id}:`, error);
      throw error;
    }
  },

  deleteWork: async (id) => {
    try {
      await axiosInstance.delete(`/works/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting work with id ${id}:`, error);
      throw error;
    }
  }
};

export default worksService;