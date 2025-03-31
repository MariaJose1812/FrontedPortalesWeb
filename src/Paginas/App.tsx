import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import Dashboard from "./dashboard";
import ServiciosAcademicos from "./servicios-academicos";
import ICienciasComputacionPensum from "../Pensums/ICienciasComputaciónPensum";
import IndustrialPensum from "../Pensums/IndustrialPensum";
import { useState } from "react";

// Definir la interfaz LoginResponse
interface LoginResponse {
  message: string;
  userId: string;
  RoleId: number;
  token: string;
}

function Login() {
  const navigate = useNavigate();

  // Estado para manejar el error de login
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Obtener los valores de los campos
    const userId = (document.getElementById('usuario') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      // Hacer la solicitud a la API de inicio de sesión
      const response = await axios.post<LoginResponse>('http://localhost:3010/api/User/signIn', {
        userId,
        password,
      });

      // Si la autenticación es exitosa, redirigir al dashboard
      if (response.status === 200) {
        // Almacenar el token y el userId en el localStorage
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userId', userId);  // Guardamos el userId
        navigate("/dashboard");
      }
    } catch (error: any) {
      // Manejar el error y mostrar un mensaje bonito
      console.error('Error en el inicio de sesión', error);
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <button className="menu-button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          &#9776; {/* Icono de las tres rayas */}
        </button>
        <img src="logo.png" alt="Logo UNICAH" className="logo-top-bar" />
      </div>

      <div className="login-box">
        <img src="logo.png" alt="Logo Grande" className="logo-large" />

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="text" 
              id="usuario" 
              className="form-control" 
              placeholder="Usuario" 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="Contraseña" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">INGRESAR</button>
          <div className="forgot-password">
            <a href="#">¿Olvidé mi contraseña?</a>
          </div>
        </form>
      </div>

      {/* Barra inferior */}
      <div className="bottom-bar">
        <p>Universidad Católica de Honduras ® 2025</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/servicios-academicos" element={<ServiciosAcademicos />} />
        <Route path="/ICienciasComputacionPensum" element={<ICienciasComputacionPensum />} />
        <Route path="/IndustrialPensum" element={<IndustrialPensum />} />
      </Routes>
    </Router>
  );
}

export default App;
