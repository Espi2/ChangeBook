'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

function AddBookForm() {
  const [formData, setFormData] = useState({
    titulo: '',
    editorial: '',
    descripcion: '',
    sinopsis: '',
    autor: '',
    calificacion: 0,
    intercambios: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/libro/crear', formData);
      alert('Libro agregado exitosamente');
      // Limpia el formulario después de agregar el libro
      setFormData({
        titulo: '',
        editorial: '',
        descripcion: '',
        sinopsis: '',
        autor: '',
        calificacion: 0,
        intercambios: 0
      });
    } catch (error) {
      console.error('Error al agregar libro:', error);
      alert('Hubo un error al agregar el libro. Por favor, intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Editorial:</label>
        <input
          type="text"
          name="editorial"
          value={formData.editorial}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Sinopsis:</label>
        <textarea
          name="sinopsis"
          value={formData.sinopsis}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Autor:</label>
        <input
          type="text"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Calificación:</label>
        <input
          type="number"
          name="calificacion"
          value={formData.calificacion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Intercambios:</label>
        <input
          type="number"
          name="intercambios"
          value={formData.intercambios}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Agregar libro</button>
    </form>
  );
}

export default AddBookForm;
