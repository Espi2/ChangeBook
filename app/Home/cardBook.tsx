import React from 'react';
import { useRouter } from 'next/navigation';

interface BookCardProps {
  idLibro: string;
  titulo: string;
  editorial: string;
  descripcion: string;
  sinopsis: string;
  autor: string;
  calificacion: number;
  intercambios: number;
  disponible: boolean;
  userNombre: string;  // Aquí añadimos el campo userNombre
  codigoUsuario: string; // Añadir esta propiedad
}

const BookCard: React.FC<BookCardProps> = ({
  idLibro,
  titulo,
  editorial,
  descripcion,
  sinopsis,
  autor,
  calificacion,
  intercambios,
  disponible,
  userNombre, // Aquí añadimos el campo userNombre
  codigoUsuario, // Añadir esta propiedad
}) => {
  const router = useRouter();

  const handleUserClick = () => {
    router.push(`/Perfil?codigoUsuario=${codigoUsuario}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-bold">{titulo}</h2>
      <p className="text-gray-600">{autor}</p>
      <p className="text-gray-600">Disponible: {disponible ? '🟢' : '🔴'}</p>
      <p className="text-gray-600">
        Subido por: <span onClick={handleUserClick} className="text-blue-500 cursor-pointer">{userNombre}</span>
      </p>
    </div>
  );
};

export default BookCard;
