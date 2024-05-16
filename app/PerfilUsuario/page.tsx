"use client"
import React, { useEffect, useState } from 'react';
import BookCard from './cardBook';
import { fetchBooks } from './libro.service';
import { fetchUser } from './user.service';

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
    const codigo = prompt('Ingrese su código:');
    if (codigo) {
      fetchUser(codigo)
        .then((fetchedUser) => {
          setUser(fetchedUser);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
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

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Perfil de {user.nombre}</h1>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.idLibro} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Perfil;
