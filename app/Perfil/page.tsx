"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { fetchBooksByUser } from './libro.service';
import BookCard from './BookCard';

interface PerfilUsuario {
  codigo: string;
  nombre: string;
  strikes: number;
  imagenPerfil: string;
  creadoEn: string;
  actualizadoEn: string;
}

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

const PerfilUsuarioPage: React.FC = () => {
  const searchParams = useSearchParams();
  const codigoUsuario = searchParams.get('codigoUsuario');
  const [perfilUsuario, setPerfilUsuario] = useState<PerfilUsuario | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (codigoUsuario) {
      const obtenerPerfilUsuario = async () => {
        try {
          const response = await axios.get(`/api/user/get/${codigoUsuario}`);
          setPerfilUsuario(response.data);
        } catch (error) {
          console.error("Error al obtener el perfil del usuario:", error);
        }
      };

      obtenerPerfilUsuario();
    }
  }, [codigoUsuario]);

  useEffect(() => {
    if (codigoUsuario) {
      fetchBooksByUser(codigoUsuario)
        .then((fetchedBooks) => {
          setBooks(fetchedBooks);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    }
  }, [codigoUsuario]);

  if (!perfilUsuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mt-4">{perfilUsuario.nombre}</h1>
      <p className="text-gray-600">Código: {perfilUsuario.codigo}</p>
      <p className="text-gray-600">Strikes: {perfilUsuario.strikes}</p>
      <p className="text-gray-600">Miembro desde: {new Date(perfilUsuario.creadoEn).toLocaleDateString()}</p>
      <p className="text-gray-600">Última actualización: {new Date(perfilUsuario.actualizadoEn).toLocaleDateString()}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.idLibro} book={book} />
        ))}
      </div>
    </div>
  );
};

export default PerfilUsuarioPage;
