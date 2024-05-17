"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";

function AddBookForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    editorial: "",
    descripcion: "",
    sinopsis: "",
    autor: "",
    calificacion: 0,
    intercambios: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [navOption, setNavOption] =
    useState(""); /* Opcion de navegacion seleccionada */
  const [waitlist, setWaitlist] =
    useState(""); /* Representa la lista de espera */
  const [searchText, setSearchText] = useState("Los más leídos");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/libro/crear", formData);
      alert("Libro agregado exitosamente");
      setShowModal(false);
      // Limpia el formulario después de agregar el libro
      setFormData({
        titulo: "",
        editorial: "",
        descripcion: "",
        sinopsis: "",
        autor: "",
        calificacion: 0,
        intercambios: 0,
      });
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert(
        "Hubo un error al agregar el libro. Por favor, intenta nuevamente."
      );
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
          <button
            className={`py-4 text-white flex items-center p-3 transition duration-0 ${
              navOption === "publicar"
                ? "bg-cbookC-700 rounded-l-3xl"
                : "hover:bg-cbookC-700 hover:rounded-l-3xl hover:pr-12"
            }`}
            onClick={() => {
              setNavOption("publicar");
              setShowModal(true);
            }}
          >
            <FontAwesomeIcon
              icon={faBook}
              className="inline-block w-8 h-8 mr-3"
            ></FontAwesomeIcon>
            <span>Publicar</span>
          </button>
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

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full h-5/6">
            <h2 className="text-center font-cbookF font-bold text-3xl justify-center text-cbookC-700">
              Publicar Nuevo Libro
            </h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
                  Título:
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="rounded-lg p-2 w-3/5 h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
                />
              </div>
              <div>
                <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
                  Editorial:
                </label>
                <input
                  type="text"
                  name="editorial"
                  value={formData.editorial}
                  onChange={handleChange}
                  className="rounded-lg p-2 w-3/5 h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
                />
              </div>
              <div>
                <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
                  Categoría:
                </label>
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="rounded-lg p-2 w-3/5 h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
                />
              </div>
              <div>
                <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
                  Sinopsis:
                </label>
                <textarea
                  name="sinopsis"
                  value={formData.sinopsis}
                  onChange={handleChange}
                  className="rounded-lg p-2 w-3/5 h-3/4 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
                ></textarea>
              </div>
              <div>
                <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
                  Autor:
                </label>
                <input
                  type="text"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  className="rounded-lg p-2 w-3/5 h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
                    Calificación:
                  </label>
                  <input
                    type="number"
                    name="calificacion"
                    value={formData.calificacion}
                    onChange={handleChange}
                    className="rounded-lg p-2 w-full h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
                    Intercambios:
                  </label>
                  <input
                    type="number"
                    name="intercambios"
                    value={formData.intercambios}
                    onChange={handleChange}
                    className="rounded-lg p-2 w-full h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  type="submit"
                  className="bg-cbookC-700 hover:bg-cbookC-600 text-white font-cbookF font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
                >
                  Agregar libro
                </button>
                <button
                  className="mt-4 bg-gray-200 hover:bg-gray-300 text-cbookC-700 font-cbookF font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBookForm;
