"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface AddBookFormProps {
  closeModal: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = (props) => {
  const [formData, setFormData] = useState({
    titulo: "",
    editorial: "",
    descripcion: "",
    sinopsis: "",
    autor: "",
    calificacion: 0,
    intercambios: 0,
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
    e.preventDefault();
    try {
      await axios.post(`/api/libro/crear`, formData);
      alert("Libro agregado exitosamente");
      setFormData({
        titulo: "",
        editorial: "",
        descripcion: "",
        sinopsis: "",
        autor: "",
        calificacion: 0,
        intercambios: 0,
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
