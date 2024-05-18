"use client"
import React, { useEffect, useState } from 'react';
import BookCard from './cardBook';
import { fetchBooks } from './libro.service';
import { fetchUser } from './user.service';
import axios from 'axios';

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
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleDeleteBook = (idLibro: string) => {
    setBooks(books.filter(book => book.idLibro !== idLibro));
  };
  
 return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-center font-cbookF font-bold text-2xl max-w-44 justify-center text-cbookC-800 opacity-60">
            {user.codigo}
            <br />
            {user.nombre}
            <br />
            strikes: {user.strikes}
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.idLibro} book={book} onDelete={handleDeleteBook} />
        ))}
      </div>
    </div>
  );
};

export default Perfil;
