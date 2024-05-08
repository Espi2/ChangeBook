"use client";

import React, { useEffect, useState } from "react";
import SearchInput from "./search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";

import { redirect } from "next/navigation";

import "./styles.css";

interface book {
  id: number;
  imageUrl: string;
  title: string;
  author: string;
}

const initDummy: book[] = [
  {
    id: 1,
    imageUrl: "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg",
    title: "Book Cover Design Formula",
    author: "Anita Nipane",
  },
  {
    id: 2,
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_book-cover-adb8a02f82394b605711f8632a44488b.jpg?ts%20=%201698323696",
    title: "the Beauty Within",
    author: "Samantha Donald",
  },
  {
    id: 3,
    imageUrl: "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg",
    title: "Book Cover Design Formula",
    author: "Anita Nipane",
  },
  {
    id: 4,
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_book-cover-adb8a02f82394b605711f8632a44488b.jpg?ts%20=%201698323696",
    title: "the Beauty Within",
    author: "Samantha Donald",
  },
  {
    id: 5,
    imageUrl: "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg",
    title: "Book Cover Design Formula",
    author: "Anita Nipane",
  },
  {
    id: 6,
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_book-cover-adb8a02f82394b605711f8632a44488b.jpg?ts%20=%201698323696",
    title: "the Beauty Within",
    author: "Samantha Donald",
  },
  {
    id: 7,
    imageUrl: "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg",
    title: "Book Cover Design Formula",
    author: "Anita Nipane",
  },
  {
    id: 8,
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_book-cover-adb8a02f82394b605711f8632a44488b.jpg?ts%20=%201698323696",
    title: "the Beauty Within",
    author: "Samantha Donald",
  },
];

function Home() {
  const [navOption, setnavOption] = useState("");
  const [books, setBooks] = useState<book[]>([]);
  const [waitlist, setWaitlist] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setBooks(initDummy);
  }, []);

  const redirectHome = () => {
    redirect("/Home");
  };

  const redirectLogin = () => {
    redirect("/inicioSesion");
  };

  const handleSearch = (query: string) => {
    // Aquí va la lógica de búsqueda utilizando el valor de "query"
    console.log("Realizar búsqueda con el término:", query);
  };

  return (
    <div className="grid grid-cols-9 grid-rows-10 gap-3 bg-gray-50 w-screen h-screen ">
      {/*Navigator de la izquierda */}

      <div className="hidden sm:block bg-cbookC-500 rounded-r-3xl shadow-xl col-span-1 row-span-10 flex-col h-screen justify-between">
        <div className="flex items-center justify-center m-5">
          <img
            src="/logo_completo_blanco_recortado.png"
            alt="Logo de la empresa"
            className="w-48 h-auto"
          />
        </div>

        {/* Menú */}
        <div className="flex flex-col items-left mx-3 gap-50 font-cbookF font-bold text-x1 justify-center cursor-pointer overflow-hidden">
          <a
            href="/Home"
            className="py-4 text-white hover:bg-cbookC-700 flex items-center hover:rounded-3xl p-3"
            onClick={() => setnavOption("inicio")}
          >
            <FontAwesomeIcon
              icon={faHome}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Inicio</span>
          </a>
          <a
            href=""
            className="py-4 text-white hover:bg-cbookC-700 flex items-center hover:rounded-3xl p-3"
            onClick={() => setnavOption("publicar")}
          >
            <FontAwesomeIcon
              icon={faBook}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Publicar</span>
          </a>
          <a
            href=""
            className="py-4 text-white hover:bg-cbookC-700 flex items-center hover:rounded-3xl p-3"
            onClick={() => setnavOption("lista")}
          >
            <FontAwesomeIcon
              icon={faClock}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Lista de espera</span>
          </a>
          <a
            href=""
            className="py-4 text-white hover:bg-cbookC-700 flex items-center hover:rounded-3xl p-3"
            onClick={() => setnavOption("perfil")}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Mi perfil</span>
          </a>
          <a
            href=""
            className="py-4 text-white hover:bg-cbookC-700 flex items-center hover:rounded-3xl p-3"
            onClick={() => setnavOption("buscar")}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Buscar</span>
          </a>

          <a
            href="InicioSesion"
            className="py-4 text-white hover:bg-cbookC-700 flex items-center hover:rounded-3xl p-3"
            onClick={() => setnavOption("salir")}
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

      <div className=" bg-white rounded-2xl border-2 border-gray-200 shadow-xl col-span-8 row-span-1 mt-3 mr-3 flex items-center justify-end ">
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

      {/*Espacio para busqueda */}

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
                className="max-w-44 sm:max-w-20 md:max-w-24 lg:max-w-32 xl:max-w-48"
                src="/libro_morado.png"
                alt="Libro blanco"
              />
              <span className="text-center font-cbookF font-bold text-2xl max-w-44 justify-center">
                Aun no has buscado libros
              </span>
            </div>
          )}
        </div>
      </div>

      {/*Muestra de los libros */}

      <div
        className="bg-white rounded-2xl shadow-xl col-span-6 row-span-6 mb-3 overflow-auto "
        id="masLeidos"
      >
        <div className="flex items-center ml-4 h-12 font-cbookF font-bold text-xl">
          Los libros más leídos
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-4">
          {books ? (
            books.map((item) => (
              <div
                key={item.id}
                className="bg-cbookC-100 rounded-lg p-2 shadow-md overflow-hidden flex flex-col"
                style={{ maxWidth: "170px" }} // Tamaño fijo para la casilla
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-w-full h-auto object-cover mb-2" // Ajuste automático del ancho de la imagen
                  style={{ maxWidth: "150px", maxHeight: "220px" }} // Tamaño máximo para la imagen
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-cbookF font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-cbookF font-normal max-w-full truncate">
                    {item.author}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
