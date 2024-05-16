
"use client";
import BookCard from './cardBook';
import { fetchBooks } from './libro.service';

import React, { useState, useEffect } from "react";
import SearchInput from "./search";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router';
import "./styles.css";
import { parseCookies } from 'nookies';




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




function Home() {
   const [navOption, setNavOption] = useState(""); /* Opcion de navegacion seleccionada */
  const [waitlist, setWaitlist] = useState(""); /* Representa la lista de espera */
  const [searchText, setSearchText] = useState("Los más leídos");
  const [books, setBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]); // Nuevo estado para los resultados de búsqueda


 useEffect(() => {
    fetchBooks("Orgullo y Prejuicio")
  .then((fetchedBooks) => {
    setBooks(fetchedBooks);
  })
  .catch((error) => {
    console.error('Error fetching books:', error);
  });

  }, []);


  const redirectHome = () => {
    redirect("/Home");
  };

  const redirectPublish = () => {
    redirect("/Publicar");
  };

  const redirectLogin = () => {
    redirect("/inicioSesion");
  };

  const handleSearch = async (query: string) => {
    console.log("Realizar búsqueda con el término:", query);
    try {
      const response = await axios.get(`/api/libros/buscar/${query}`);
      const searchResults = response.data;
        setSearchResults(searchResults); // Actualiza los resultados de búsqueda en el nuevo estado
        setSearchText("Resultados de la búsqueda");
        
       if (searchResults.length === 0)  {
        alert("No se encontró ningún libro registrado con ese nombre.");
        setSearchResults([]);
        setSearchText("Resultados de la búsqueda");
      }
    } catch (error) {
      console.error("Error al buscar libros:", error);
      alert("Hubo un error al realizar la búsqueda. Por favor, intenta nuevamente.");
    }
  };

  

  return (
    <div className="grid grid-cols-9 grid-rows-10 gap-3 bg-gray-50 w-screen h-screen ">
      {/*Navigator de la izquierda */}
      <div className="hidden sm:block bg-cbookC-500 rounded-r-3xl shadow-xl col-span-1 row-span-10 flex-col h-screen justify-between">
        <div className="flex items-center justify-center m-5 mb-10">
          <img
            src="/logo_completo_blanco_recortado.png"
            alt="Logo de la empresa"
            className="w-48 h-auto"
          />
        </div>

        {/* Menú lateral izquierdo*/}
        <div className="flex flex-col items-left mx-3 gap-50 font-cbookF font-bold text-x1 cursor-pointer overflow-hidden mr-0">
          <a
            href="/Home"
            className={`py-4 text-white flex items-center p-3 transition duration-0 ${
              navOption === "inicio"
                ? "bg-cbookC-700 rounded-l-3xl"
                : "hover:bg-cbookC-700 hover:rounded-l-3xl hover:pr-12"
            }`}
            onClick={() => setNavOption("inicio")}
          >
            <FontAwesomeIcon
              icon={faHome}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Inicio</span>
          </a>
          <a
            href="Publicar"
            className={`py-4 text-white flex items-center p-3 transition duration-0 ${
              navOption === "publicar"
                ? "bg-cbookC-700 rounded-l-3xl"
                : "hover:bg-cbookC-700 hover:rounded-l-3xl hover:pr-12"
            }`}
            onClick={() => setNavOption("Publicar")}
          >
            <FontAwesomeIcon
              icon={faBook}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Publicar</span>
          </a>
          <a
            href=""
            className={`py-4 text-white flex items-center p-3 transition duration-0 ${
              navOption === "lista"
                ? "bg-cbookC-700 rounded-l-3xl"
                : "hover:bg-cbookC-700 hover:rounded-l-3xl hover:pr-12"
            }`}
            onClick={() => setNavOption("lista")}
          >
            <FontAwesomeIcon
              icon={faClock}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Lista de espera</span>
          </a>
          <a
            href=""
            className={`py-4 text-white flex items-center p-3 transition duration-0 ${
              navOption === "perfil"
                ? "bg-cbookC-700 rounded-l-3xl"
                : "hover:bg-cbookC-700 hover:rounded-l-3xl hover:pr-12"
            }`}
            onClick={() => setNavOption("perfil")}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Mi perfil</span>
          </a>
          <a
            href=""
            className={`py-4 text-white flex items-center p-3 transition duration-0 ${
              navOption === "buscar"
                ? "bg-cbookC-700 rounded-l-3xl"
                : "hover:bg-cbookC-700 hover:rounded-l-3xl hover:pr-12"
            }`}
            onClick={() => setNavOption("buscar")}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Buscar</span>
          </a>

          <a
            href="InicioSesion"
            className={`py-4 text-white flex items-center p-3 transition duration-0 ${
              navOption === "salir"
                ? "bg-cbookC-700 rounded-l-3xl"
                : "hover:bg-cbookC-700 hover:rounded-l-3xl hover:pr-12"
            }`}
            onClick={() => setNavOption("salir")}
          >
            <FontAwesomeIcon
              icon={faSignOut}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Salir</span>
          </a>
        </div>
      </div>
      {/*Barra superior con notificaciones */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl col-span-8 row-span-1 mt-3 mr-3 flex items-center justify-end ">
        <a href="" className="flex items-center">
          <span className="font-cbookF font-bold text-x1 text-cbookC-700 mr-2">
            Notificaciones
          </span>
          <FontAwesomeIcon
            icon={faBell}
            className="w-8 h-8 text-cbookC-700"
          ></FontAwesomeIcon>
        </a>
        <img
          className="ml-6 w-10 h-10 mr-6"
          src="/libro_morado.png"
          alt="Libro"
        />
      </div>

      {/*Espacio para BUSCADOR */}
      <div className="bg-gradient-to-r from-cbookC-500 via-cbookC-700 to-cbookC-600 rounded-2xl shadow-xl row-span-3 col-span-6 flex flex-col items-center ">
        <section className="flex flex-col px-8 mt-4 font-bold text-center rounded-3xl max-w-[875px] max-md:px-5">
          <h1 className="self-center font-cbookF font-bold text-5xl m-5 md:text-10px sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-white">
            ¡Busquemos un nuevo libro!
          </h1>
          <SearchInput onSearch={handleSearch} placeholder="Buscar..." />
        </section>
      </div>

      {/*Muestra de info del perfil */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl col-span-2 row-span-9 mr-3 mb-3 flex justify-center items-center">
        <div className="">
          {waitlist ? (
            <div>hola</div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                className="max-w-44 sm:max-w-20 md:max-w-24 lg:max-w-32 xl:max-w-48 opacity-60"
                src="/libro_morado.png"
                alt="Libro blanco"
              />
              <span className="text-center font-cbookF font-bold text-2xl max-w-44 justify-center text-cbookC-800 opacity-60">
                Aún no has buscado libros.
              </span>
            </div>
          )}
        </div>
      </div>

{/* Muestra de los libros */}
      <div
        className="bg-white rounded-2xl shadow-xl col-span-6 row-span-6 mb-3 overflow-auto "
        id="masLeidos"
      >
        {/* Cambios para mostrar los resultados de la búsqueda */}
        <div className="flex items-center ml-4 h-12 font-cbookF font-bold text-2xl">
          {searchText}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Mostrar los resultados de búsqueda si hay resultados, de lo contrario, mostrar los libros más leídos */}
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <BookCard key={book.idLibro} book={book} />
            ))
          ) : (
            books.map((book) => (
              <BookCard key={book.idLibro} book={book} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
