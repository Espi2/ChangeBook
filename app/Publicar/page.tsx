"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
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
    isbn: "",
    ano_de_publicacion: ""
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const codigoUsuario = localStorage.getItem("codigoUsuario");

    const formDataWithImage = new FormData();
    formDataWithImage.append("titulo", formData.titulo);
    formDataWithImage.append("autor", formData.autor);
    formDataWithImage.append("editorial", formData.editorial);
    formDataWithImage.append("sinopsis", formData.sinopsis);
    formDataWithImage.append("isbn", formData.isbn);
    formDataWithImage.append("ano_de_publicacion", formData.ano_de_publicacion);
    formDataWithImage.append("codigo", codigoUsuario!);  // Añadir el código de usuario al form data
    if (image) {
      formDataWithImage.append("file", image);  // Cambiar el nombre del campo a "file"
    }

    try {
      await axios.post(`/api/books`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Libro agregado exitosamente");
      setFormData({
        titulo: "",
        autor: "",
        editorial: "",
        sinopsis: "",
        isbn: "",
        ano_de_publicacion: ""
      });
      setImage(null);
      props.closeModal();
    } catch (error) {
      console.error("Error al agregar libro:", error);
      alert("Hubo un error al agregar el libro. Por favor, intenta nuevamente.");
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
        <div>
          <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
            ISBN:
          </label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="rounded-lg p-2 w-3/5 h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
          />
        </div>
        <div>
          <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
            Año de Publicación:
          </label>
          <input
            type="text"
            name="ano_de_publicacion"
            value={formData.ano_de_publicacion}
            onChange={handleChange}
            className="rounded-lg p-2 w-3/5 h-7 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
          />
        </div>
        <div>
          <label className="font-cbookF block text-gray-600 font-bold mb-0 mt-1">
            Imagen:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="rounded-lg p-2 w-3/5 bg-gray-100 text-gray-600 font-cbookF focus:outline-none"
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
