import axiosInstance from "./axiosInstance";

const kindergartenService = {
  getAllKindergartens: async () => {
    try {
      const response = await axiosInstance.get("/kindergartens");
      return response.data;
    } catch (error) {
      console.error("Error fetching kindergartens:", error);
      throw error;
    }
  },
  getMyKindergartens: async () => {
    const response = await axiosInstance.get("/works/my-kindergartens");
    return response.data;
  },

  getStatistics: async () => {
    try {
      const response = await axiosInstance.get("/kindergartens/statistics");
      return response.data;
    } catch (error) {
      console.error("Error fetching kindergartens:", error);
      throw error;
    }
  },

  getKindergartenById: async (id) => {
    try {
      const response = await axiosInstance.get(`/kindergartens/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching kindergarten with id ${id}:`, error);
      throw error;
    }
  },

  createKindergarten: async (kindergartenData) => {
    try {
      const response = await axiosInstance.post(
        "/kindergartens",
        kindergartenData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating kindergarten:", error);
      throw error;
    }
  },

  updateKindergarten: async (id, kindergartenData) => {
    try {
      const response = await axiosInstance.put(
        `/kindergartens/${id}`,
        kindergartenData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating kindergarten with id ${id}:`, error);
      throw error;
    }
  },

  deleteKindergarten: async (id) => {
    try {
      await axiosInstance.delete(`/kindergartens/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting kindergarten with id ${id}:`, error);
      throw error;
    }
  },
};

export default kindergartenService;
