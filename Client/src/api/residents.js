import axios from "axios";

const API_URL = "https://the-resident-book.onrender.com";

export const getResidents = async () => {
  try {
    const response = await axios.get(`${API_URL}/residents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching residents:", error);
    throw error;
  }
};

export const addResident = async (residentData) => {
  try {
    const response = await axios.post(`${API_URL}/residents`, residentData);
    return response.data;
  } catch (error) {
    console.error("Error adding resident:", error);
    throw error;
  }
};
