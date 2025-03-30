import "bootstrap/dist/css/bootstrap.min.css";
import { FaChalkboardTeacher, FaBook, FaQrcode, FaDesktop, FaChalkboard, FaVideo } from "react-icons/fa";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <div className="app-container">
      <nav className="top-navbar navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="logo.png" alt="Logo" className="navbar-logo" />
          </a>
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="#">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="#">Perfil</Link></li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogoutClick}>Cerrar sesión</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container-fluid">
          <h1 className="welcome-title">Bienvenido</h1>
          <p className="welcome-subtitle">Seleccione el sistema al que desea acceder</p>
          
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

      <footer className="bottom-navbar">
        <div className="container text-center py-2">
          <span className="footer-text">© 2025 Universidad - Todos los derechos reservados</span>
        </div>
      </footer>

      {showModal && (
        <div className="modal" tabIndex={-1} style={{ display: 'block' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Estás seguro de que quieres cerrar sesión?</h5>
                <button type="button" className="btn-close" onClick={handleCancelLogout}></button>
              </div>
              <div className="modal-body">
                <p>Si cierras sesión, tendrás que iniciar sesión nuevamente para acceder a tu cuenta.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelLogout}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmLogout}>Cerrar sesión</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
