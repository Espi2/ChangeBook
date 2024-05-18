"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

interface AddBookFormProps {
  closeModal: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = (props) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    editorial: "",
    sinopsis: "",
  });

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
    const codigoUsuario = localStorage.getItem("codigoUsuario");
    e.preventDefault();
    try {
      await axios.post(`/api/books/${codigoUsuario}`, formData);
      alert("Libro agregado exitosamente");
      setFormData({
        titulo: "",
        autor: "",
        editorial: "",
        sinopsis: "",
      });
      props.closeModal();
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert(
        "Hubo un error al agregar el libro. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
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
            Sinopsis:
          </label>
          <textarea
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            className="rounded-lg p-2 w-3/5 h-3/4 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          type="submit"
          className="bg-cbookC-700 hover:bg-cbookC-600 text-white font-cbookF font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
        >
          Publicar
        </button>

        <button
          type="button"
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-cbookC-700 font-cbookF font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          onClick={props.closeModal}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
