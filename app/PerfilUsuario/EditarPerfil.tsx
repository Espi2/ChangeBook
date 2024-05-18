import React, { useState } from 'react';
import axios from 'axios';

const EditarPerfil: React.FC = () => {
  const [imagenPerfil, setImagenPerfil] = useState<File | null>(null);
  const [nombre, setNombre] = useState('');
  const [modificacionNombre, setModificacionNombre] = useState(false);
  const [modificacionImagen, setModificacionImagen] = useState(false);

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
    setModificacionNombre(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagenPerfil(event.target.files[0]);
      setModificacionImagen(true);
    }
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const codigoUsuario = localStorage.getItem("codigoUsuario");

  if (!codigoUsuario) {
    alert("No se encontró el código de usuario.");
    return;
  }

  try {
    if (modificacionImagen) {
  const formData = new FormData();
  if (imagenPerfil) {
    formData.append('file', imagenPerfil);
  }

      await axios.patch(`/api/user/patchImage/${codigoUsuario}`, formData);
    }

    if (modificacionNombre) {
      await axios.patch(`/api/user/patch/${codigoUsuario}`, { nombre });
    }

    alert("Perfil actualizado exitosamente.");
    window.location.reload();
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    alert("Hubo un error al actualizar el perfil.");
  }
};



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="Nuevo Nombre" value={nombre} onChange={handleNombreChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button type="submit">Actualizar Perfil</button>
    </form>
  );
};

export default EditarPerfil;
