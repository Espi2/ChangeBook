import React from "react";
import { deleteBook } from "./libro.service";

interface Book {
  idLibro: string;
  titulo: string;
  editorial: string;
  descripcion: string;
  sinopsis: string;
  autor: string;
  calificacion: number;
  intercambios: number;
  disponible: boolean;
}

interface BookCardProps {
  book: Book;
  onDelete: (idLibro: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Deseas eliminar este libro?");
    if (confirmDelete) {
      try {
        await deleteBook(book.idLibro);
        onDelete(book.idLibro);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="font-bold text-lg">{book.titulo}</h2>
        <p className="text-sm text-gray-600">by {book.autor}</p>
        <p className="text-gray-600">Estado: {book.disponible ? "🟢" : "🔴"}</p>
        <button
          onClick={handleDelete}
          className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default BookCard;
