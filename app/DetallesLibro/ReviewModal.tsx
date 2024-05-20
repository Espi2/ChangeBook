import React, { useState, useEffect } from "react";
import axios from "axios";

interface ReviewModalProps {
  idLibro: string;
  isAddingReview: boolean;
  onClose: () => void;
}

interface Review {
  comentario: string;
  calificacion: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ idLibro, isAddingReview, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ comentario: "", calificacion: 0 });
  
  useEffect(() => {
    if (!isAddingReview) {
      axios.get(`api/comentarios/get/${idLibro}`)
        .then(response => setReviews(response.data.comments))
        .catch(error => console.error("Error fetching reviews:", error));
    }
  }, [idLibro, isAddingReview]);

  const handleAddReview = async () => {
    try {
      await axios.post("api/comentarios", {
        comentario: newReview.comentario,
        idLibro,
        calificacion: newReview.calificacion,
      });
      onClose();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-lg">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>x</button>
        {isAddingReview ? (
          <div>
            <h2 className="text-2xl mb-4">Agregar Reseña</h2>
            <textarea
              className="w-full p-2 border rounded mb-2"
              placeholder="Escribe tu reseña"
              value={newReview.comentario}
              onChange={(e) => setNewReview({ ...newReview, comentario: e.target.value })}
            />
            <div>
              <label>Calificación: </label>
              <select
                value={newReview.calificacion}
                onChange={(e) => setNewReview({ ...newReview, calificacion: parseInt(e.target.value) })}
              >
                <option value={0}>Seleccione</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <button className="mt-4 bg-green-600 text-white py-1 px-4 rounded" onClick={handleAddReview}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Reseñas</h2>
            {reviews.length === 0 ? (
              <p>No hay reseñas.</p>
            ) : (
              <ul>
                {reviews.map((review, index) => (
                  <li key={index} className="mb-2">
                    <p>{review.comentario}</p>
                    <p>Calificación: {review.calificacion}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
