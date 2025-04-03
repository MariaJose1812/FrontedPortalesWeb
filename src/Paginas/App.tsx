import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import Dashboard from "./dashboard";
import ServiciosAcademicos from "./servicios-academicos";
import ICienciasComputacionPensum from "../Pensums/ICienciasComputaciónPensum";
import IndustrialPensum from "../Pensums/IndustrialPensum";
// import CivilPensum from "../Pensums/CivilPensum";
// import DerechoPensum from "../Pensums/DerechoPensum";
// import EmpresasPensum from "../Pensums/EmpresasPensum";
// import MedicinaCirugiaPensum from "../Pensums/MedicinaCirugiaPensum";
// import MercadotecniaPensum from "../Pensums/MercadotecniaPensum";
// import PsicologiaPensum from "../Pensums/PsicologiaPensum";
import { useState } from "react";
import Aprobadas from "./Aprobadas";
import AprobadasAlumno from "./AprobadasAlumno";

interface LoginResponse {
  message: string;
  userId: string;
  RoleId: number | null;
  token: string;
}

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = (document.getElementById('usuario') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      const response = await axios.post<LoginResponse>('http://localhost:3010/api/User/signIn', {
        userId,
        password,
      });

      if (response.status === 200) {
        
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userId', userId);

        localStorage.setItem('RoleId', response.data.RoleId ? response.data.RoleId.toString() : 'null');

        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error('Error en el inicio de sesión', error);
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <button className="menu-button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          &#9776;
        </button>
        <img src="logo.png" alt="Logo UNICAH" className="logo-top-bar" />
      </div>

      <div className="login-box">
        <img src="logo.png" alt="Logo Grande" className="logo-large" />

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

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
        {/* <Route path="/CivilPensum" element={<CivilPensum />} />
        <Route path="/DerechoPensum" element={<DerechoPensum />} />
        <Route path="/EmpresasPensum" element={<EmpresasPensum />} />
        <Route path="/MedicinaCirugiaPensum" element={<MedicinaCirugiaPensum />} />
        <Route path="/MercadotecniaPensum" element={<MercadotecniaPensum />} />
        <Route path="/PsicologiaPensum" element={<PsicologiaPensum />} /> */}
        {/* Agrega aquí más rutas para otros pensums */}
        <Route path="/Aprobadas" element={<Aprobadas />} />
        <Route path="/AprobadasAlumno" element={<AprobadasAlumno />} />
      </Routes>
    </Router>
  );
}

export default App;
