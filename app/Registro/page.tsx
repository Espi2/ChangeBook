"use client";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import { useState } from "react";
import React, { FunctionComponent } from "react";
import "./Registro.css";

const Registro: FunctionComponent = () => {
  const handleOpenTerms = () => {
    window.open("../TerminosCondiciones", "_blank", "width=600,height=400");
  };

  const [username, setUsername] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [career, setCareer] = useState("");
  const [credentialImage, setCredentialImage] = useState("");
  const [faceImage, setFaceImage] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleStudentCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentCode(event.target.value);
  };

  const handleCareerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCareer(event.target.value);
  };

  const handleCredentialImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setCredentialImage(event.target.files[0].name);
    }
  };

  const handleFaceImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFaceImage(event.target.files[0].name);
    }
  };

  const handleTermsCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsChecked(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h2 className="title">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo Institucional"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="studentCode"
              name="studentCode"
              placeholder="Código de estudiante"
              value={studentCode}
              onChange={handleStudentCodeChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="career"
              name="career"
              placeholder="Carrera"
              value={career}
              onChange={handleCareerChange}
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              id="credentialImage"
              name="credentialImage"
              accept="image/*"
              onChange={handleCredentialImageChange}
            />

            <input
              type="file"
              id="faceImage"
              name="faceImage"
              accept="image/*"
              onChange={handleFaceImageChange}
            />
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsChecked}
              onChange={handleTermsCheckboxChange}
            />
            {/* Abre la ventana emergente con los términos y condiciones */}
            <label htmlFor="terms" onClick={handleOpenTerms}>
              Acepto los{" "}
              <span className="link-text">términos y condiciones</span>
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={!termsChecked}>
            Registrarse
          </button>
        </form>
        <p className="register-text">
          ¿Ya tienes una cuenta? <Link href={"../InicioSesion"}>Acceder</Link>{" "}
        </p>
      </div>

      <div className="right-panel">
        <h2 id="textobienvenido">¡Bienvenido!</h2>
        {/* Reemplaza la ruta con tu logo */}
        <Image
          src="/logo_completo_blanco.png"
          alt="Logo"
          width={300}
          height={10}
          id="Imagen"
        />
      </div>
    </div>
  );
};

export default Registro;
