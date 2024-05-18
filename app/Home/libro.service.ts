import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/libro';

export const fetchBooks = async (query: string) => {
  try {
    const response = await axios.get(`api/books/byTitle/${query}`);
    return response.data.map((book: any) => ({
      ...book,
      userNombre: book.user.nombre,
      codigoUsuario: book.user.codigo,
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const ratedBooks = async () => {
  try {
    const response = await axios.get(`api/books`);
    return response.data.map((book: any) => ({
      ...book,
      userNombre: book.user.nombre,
      codigoUsuario: book.user.codigo,
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
