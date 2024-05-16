import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/libro';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`/api/libro/buscar/Orgullo y Prejuicio`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
