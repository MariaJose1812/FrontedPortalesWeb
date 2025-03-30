import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";
import ServiciosAcademicos from "./servicios-academicos";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard"); // Redirige al Dashboard
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
        {/* Logo grande */}
        <img src="logo.png" alt="Logo Grande" className="logo-large" />

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
      </Routes>
    </Router>
  );
}

export default App;

