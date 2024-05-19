"use client";
import React, { useEffect, useState } from "react";
import BookCard from "./cardBook";
import EditarPerfil from "./EditarPerfil"; // Importa el componente EditarPerfil
import { fetchBooks } from "./libro.service";
import { fetchUser } from "./user.service";
import axios from "axios";

interface Book {
  idLibro: string;
  titulo: string;
  autor: string;
  editorial: string;
  descripcion: string;
  sinopsis: string;
  calificacion: number;
  intercambios: number;
  disponible: boolean;
  userNombre: string;
  codigoUsuario: string;
  imagen: string;
}

interface User {
  codigo: string;
  nombre: string;
  strikes: number;
  imagenPerfil: string;
  creadoEn: Date;
  actualizadoEn: Date;
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [showEditForm, setShowEditForm] = useState(false); // Nuevo estado para controlar la visibilidad del formulario de edición

  useEffect(() => {
    const codigoUsuario = localStorage.getItem("codigoUsuario");

    const obtenerPerfilUsuario = async () => {
      try {
        const response = await axios.get(`api/user/get/${codigoUsuario}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    if (codigoUsuario) {
      obtenerPerfilUsuario();
    }
  }, []);

  useEffect(() => {
    fetchBooks()
      .then((fetchedBooks) => {
        setBooks(fetchedBooks);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleDeleteBook = (idLibro: string) => {
    setBooks(books.filter((book) => book.idLibro !== idLibro));
  };

  const handleUpdateAvailability = (idLibro: string, disponible: boolean) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.idLibro === idLibro ? { ...book, disponible: !disponible } : book
      )
    );
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      {user && (
        <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-cbookC-400 via-cbookC-600 to-cbookC-700 rounded-2xl shadow-xl h-56" >
          <div className="flex items-center">
            <img
              loading="lazy"
              src={user.imagenPerfil}
              alt="Imagen de perfil"
              className="ml-8 w-36 h-36 rounded-full mr-4"
            />
            <span className="text-justify font-cbookF font-bold text-2xl max-w-full justify-center text-white ml-5">
              {user.nombre}
              <br />
              <span className="text-cbookC-700">{user.codigo}</span>
              <br />
              <br />
              Strikes: {user.strikes}
            </span>
          </div>
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="bg-cbookC-400 hover:bg-cbookC-300 mr-8 text-white font-cbookF font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
          >
            Editar Perfil
          </button>
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3">
            <h2 className="text-center font-cbookF font-bold text-3xl justify-center text-cbookC-700 mt-3 mb-8">
              Editar Perfil
            </h2>
            <button
              onClick={() => setShowEditForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none flex"
            >
              x
            </button>
            <EditarPerfil />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.idLibro}
            book={book}
            onDelete={handleDeleteBook}
            onUpdateAvailability={handleUpdateAvailability}
          />
        ))}
      </div>
    </div>
  );
};

export default Perfil;
