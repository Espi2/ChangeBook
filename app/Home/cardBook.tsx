import React from "react";
import { useRouter } from "next/navigation";

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
  userNombre: string;
  codigoUsuario: string;
  imagen: string; // Añadir esta propiedad
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
  userNombre,
  codigoUsuario,
  imagen, // Añadir esta propiedad
}) => {
  const router = useRouter();


    const handleCardClick = () => {
    router.push(`/DetallesLibro?idLibro=${idLibro}`);
  };

  const handleUserClick = () => {
    router.push(`/Perfil?codigoUsuario=${codigoUsuario}`);
  };

  return (
    <div className="bg-cbookC-100 shadow-md rounded-md p-4" >
      <img
        loading="lazy"
        src={imagen}
        alt={titulo}
        className="w-full max-h-64 object-cover rounded-md"
        onClick={handleCardClick}
         style={{ cursor: 'pointer' }} 
      />
      <h2  style={{ cursor: 'pointer' }}  onClick={handleCardClick} className="text-lg font-bold font-cbookF">{titulo}</h2>
      <p   style={{ cursor: 'pointer' }}  onClick={handleCardClick} className="text-gray-600 font-cbookF">{autor}</p>
      <p   onClick={handleCardClick} className="text-gray-600 font-cbookF">
        Estado: {disponible ? "🟢" : "🔴"}
      </p>
      <p className="text-gray-600 font-cbookF">
        Publicado por:{" "}
        <span
          onClick={handleUserClick}
          className="text-cbookC-600 cursor-pointer"
        >
          {userNombre}
        </span>
      </p>
    </div>
  );
};

export default BookCard;
