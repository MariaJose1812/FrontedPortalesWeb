import "bootstrap/dist/css/bootstrap.min.css";
import { FaChalkboardTeacher, FaBook, FaQrcode, FaDesktop, FaChalkboard, FaVideo } from "react-icons/fa";
import "./dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="app-container">
      {/* Navbar Superior */}
      <nav className="top-navbar navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="logo.png" alt="Logo" className="navbar-logo" />
          </a>
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="#">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="#">Perfil</Link></li>
              <li className="nav-item"><Link className="nav-link" to="#">Cerrar sesión</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="main-content">
        <div className="container-fluid">
          <h1 className="welcome-title">Bienvenido</h1>
          <p className="welcome-subtitle">Seleccione el sistema al que desea acceder</p>
          
          {/* Fila de Cards - Primera Línea */}
          <div className="horizontal-cards-row">
            <Link to="#" className="horizontal-card btn-blue">
              <FaVideo className="card-icon" />
              <span className="card-text">Aula Virtual</span>
            </Link>
            
            <Link to="#" className="horizontal-card btn-blue">
              <FaBook className="card-icon" />
              <span className="card-text">Bibliotecas</span>
            </Link>
            
            <Link to="#" className="horizontal-card btn-green">
              <FaQrcode className="card-icon" />
              <span className="card-text">Registro 2025 Matrícula</span>
            </Link>
          </div>
          
          {/* Fila de Cards - Segunda Línea */}
          <div className="horizontal-cards-row">
            <Link to="/servicios-academicos" className="horizontal-card btn-blue">
              <FaDesktop className="card-icon" />
              <span className="card-text">Servicios Académicos</span>
            </Link>
            
            <Link to="#" className="horizontal-card btn-blue">
              <FaChalkboardTeacher className="card-icon" />
              <span className="card-text">Moodle 2024 (Nuevo)</span>
            </Link>
            
            <Link to="#" className="horizontal-card btn-blue">
              <FaChalkboard className="card-icon" />
              <span className="card-text">Moodle ICB</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Inferior */}
      <footer className="bottom-navbar">
        <div className="container text-center py-2">
          <span className="footer-text">© 2025 Universidad - Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;