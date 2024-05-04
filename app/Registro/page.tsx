"use client"
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import { useState } from "react";
import React, { FunctionComponent } from "react";
import "./Registro.css";

import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/index";
import { faEye, faEyeSlash } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";

const Registro: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar la contraseña
    const [credentialImage, setCredentialImage] = useState("");


  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleStudentCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentCode(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleTermsCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsChecked(event.target.checked);
  };


   const handleOpenTerms = () => {
    window.open("../TerminosCondiciones", "_blank", "width=600,height=400");
  };

  const handleCredentialImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCredentialImage(event.target.files[0].name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validación: Verificar si todos los campos están completados
    if (!username || !studentCode || !password || !email) {
      alert("Completa todos los campos");
      return;
    }

    if (!termsChecked) {
      alert("Acepta los términos y condiciones para continuar");
      return;
    }

    try {
      // Si el código no está registrado, procede con la creación de la credencial y el usuario
      const credencialResponse = await fetch(`/api/credenciales/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: studentCode,
          password: password,
          correo: email,
        }),
      });
      const credencialData = await credencialResponse.json();

      if (credencialResponse.ok) {
        // Si la creación de la credencial fue exitosa, entonces procede a crear el usuario
        const userResponse = await fetch(`/api/user/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigo: studentCode,
            nombre: username,
            strikes: 0,
            imagenPerfil: 'notyet', // Se obtiene la imagen de la credencial
          }),
        });
        const userData = await userResponse.json();

        if (userResponse.ok) {
          alert("¡Registro exitoso!");
          // Aquí redirigir al usuario a la página principal
        } else {
          alert("Error al crear el usuario.");
        }
      } else {
        alert("Error al crear la credencial.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la solicitud");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
  <input
    type={showPassword ? "text" : "password"}
    id="password"
    name="password"
    placeholder="Contraseña"
    value={password}
    onChange={handlePasswordChange}
  />
  <button type="button" onClick={toggleShowPassword}>
    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
  </button>
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
              type="file" 
              id="credentialImage" 
              name="credentialImage" 
              accept="image/*"
              onChange={handleCredentialImageChange}
            />
            {credentialImage && <p>Credencial: {credentialImage}</p>}
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsChecked}
              onChange={handleTermsCheckboxChange}
            />
             <label htmlFor="terms" onClick={handleOpenTerms}>
              Acepto los{" "}
              <span className="link-text">términos y condiciones</span>
            </label>
          </div>
          
          <button type="submit" className="login-btn">
            Registrarse
          </button>
        </form>
        <p className="register-text">
          ¿Ya tienes una cuenta? <Link href={"../InicioSesion"}>Acceder</Link>{" "}
        </p>
      </div>

      <div className="right-panel">
        <h2 id="textobienvenido">¡Bienvenido!</h2>
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