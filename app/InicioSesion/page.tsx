"use client";
import { FunctionComponent, useState } from "react";
import React from "react";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import "./InicioDeSesin.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "nookies";

const InicioDeSesin: FunctionComponent = () => {
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleAuth = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        codigo,
        password,
      });
      const { access_token } = response.data;

      setCookie(null, "token", access_token, {
        maxAge: 60,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    } catch (error) {
      console.log("Error en la autenticacion:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!codigo || !password) {
      alert("Por favor, complete todos los campos");
      return;
    }

    try {
      const response = await fetch(`/api/credenciales/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo, password }),
      });
      const data = await response.json();

      if (data.success) {
        handleAuth();
        router.push("/Home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la solicitud");
    }
  };

  return (
    <div className="container">
      {/*Panel izquierdo*/}
      <div className="left-panel">
        <h2 className="title">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="codigo"
              name="codigo"
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Acceder
          </button>
        </form>
        <p className="register-text">
          ¿No tienes una cuenta? <Link href={"../Registro"}>Regístrate</Link>{" "}
        </p>
      </div>

      {/*Panel derecho*/}
      <div className="right-panel">
        <h2 id="textobienvenido">¡Bienvenido!</h2>
        <Image
          src="/logo_completo_blanco.png"
          alt="Logo"
          width={350}
          height={10}
          id="Imagen"
        />
      </div>
    </div>
  );
};

export default InicioDeSesin;
