import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReviewModal from "./ReviewModal"; 

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
  isbn: string;
  ano_de_publicacion: string;
  userNombre: string;
  codigoUsuario: string;
  imagenPerfil: string;
  imagen: string;
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
  isbn,
  ano_de_publicacion,
  disponible,
  userNombre,
  codigoUsuario,
  imagenPerfil,
  imagen,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const usuarioCodigo = localStorage.getItem("codigoUsuario");
  const router = useRouter();

  const handleWishListClick = async () => {
    try {
      await axios.post(`/api/wishlist/anadirLibro`, {
        idLibro,
        codigo: usuarioCodigo,
      });
      alert("Libro añadido a la lista de deseos.");
    } catch (error) {
      console.error("Error añadiendo libro a la lista de deseos:", error);
    }
  };

  const handleShowReviews = () => {
    setIsAddingReview(false);
    setShowReviewModal(true);
  };

  const handleAddReview = () => {
    setIsAddingReview(true);
    setShowReviewModal(true);
  };

  return (
    <div className="bg-white rounded-md p-4 h-full flex">
      <div className="flex-1">
        <h2 className="text-3xl font-bold font-cbookF">{titulo}</h2>
        <p className="text-2xl text-cbookC-600 font-cbookF font-bold">{autor}</p>
        <br />
        <p className="text-xl text-gray-600 font-cbookF">
          Año publicacion: {ano_de_publicacion}
        </p>
        <p className="text-xl text-gray-600 font-cbookF">Editorial: {editorial}</p>
        <p className="text-xl text-gray-600 font-cbookF">ISBN: {isbn}</p>
        <p className="text-xl text-gray-600 font-cbookF">
          Estatus: {disponible ? "Disponible" : "No Disponible"}
        </p>
        <br />
        <p className="text-xl text-gray-600 font-cbookF text-justify">
          Sinopsis
          <br /> {sinopsis}
        </p>
        <button
          onClick={handleWishListClick}
          className="mt-2 bg-cbookC-600 text-white py-1 px-4 rounded"
        >
          Añadir a WishList
        </button>
        <button
          onClick={handleShowReviews}
          className="mt-2 bg-blue-600 text-white py-1 px-4 rounded"
        >
          Ver Reseñas
        </button>
        <button
          onClick={handleAddReview}
          className="mt-2 bg-green-600 text-white py-1 px-4 rounded"
        >
          Agregar Reseña
        </button>
      </div>
      <div className="ml-4 flex-shrink-0 w-64 h-96 mt-0">
        <img
          loading="lazy"
          src={imagen}
          alt={titulo}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      {showReviewModal && (
        <ReviewModal
          idLibro={idLibro}
          isAddingReview={isAddingReview}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};

export default BookCard;
