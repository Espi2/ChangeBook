import React from "react";

interface Book {
  idLibro: string;
  titulo: string;
  editorial: string;
  descripcion: string;
  sinopsis: string;
  autor: string;
  calificacion: number;
  intercambios: number;
}

interface BookCardProps {
  book: Book;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const maxLength = 130; // Ajusta este valor al número máximo de caracteres deseado

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="font-bold text-lg">{book.titulo}</h2>
        <p className="text-sm text-gray-500 italic">{book.autor}</p>
        <p className="text-sm text-gray-600 text-justify">
          {truncateText(book.sinopsis, maxLength)}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
