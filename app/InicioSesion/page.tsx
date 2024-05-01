import { FunctionComponent } from "react";
import React from "react";
import Link from "@/node_modules/next/link";
import "./InicioDeSesin.css";
import Image from "@/node_modules/next/image";

const InicioDeSesin: FunctionComponent = () => {

  return (
    <div className="container">
      <div className="left-panel">
        <h2 className="title">Inicio de sesión</h2>
        <form>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Correo Institucional" />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Contraseña" 
            />
          </div>
          <button type="submit" className="login-btn">Acceder</button>
        </form>
        <p className="register-text">¿No tienes una cuenta? <Link href={'../Registro'}>Regístrate</Link> </p>
      </div>
      
      <div className="right-panel">
        <h2 id="textobienvenido">¡Bienvenido!</h2>
        <Image src="/logo_completo_blanco.png" alt="Logo" width={350} height={20} id="Imagen" />
      </div>
    </div>
  );
};

export default InicioDeSesin;
