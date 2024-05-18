import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/libro';

export const fetchBooks = async () => {
  try {
    const codigoUsuario = localStorage.getItem("codigoUsuario");
    const response = await axios.get(`/api/books/for/${codigoUsuario}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const deleteBook = async (idLibro: string) => {
  try {
    const response = await axios.delete(`/api/books/${idLibro}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};