import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";



function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard"); // Redirige al Dashboard
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <header>
          <img src="logo.png" alt="Logo UNICAH" className="logo" />
        </header>

        {/* Título */}
        <h1 className="title">UNIVERSIDAD CATÓLICA DE HONDURAS</h1>
        <h2 className="subtitle">NUESTRA SEÑORA REINA DE LA PAZ</h2>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuario" className="form-control" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">INGRESAR</button>
          <div className="forgot-password">
            <a href="#">¿Olvidé mi contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

// Configuración de rutas
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
