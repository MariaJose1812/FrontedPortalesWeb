import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./TopBar.css";
import logo from "../assets/logo.png";

const TopBar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => setShowModal(true);
  const handleCancelLogout = () => setShowModal(false);
  const handleConfirmLogout = () => {
    setShowModal(false);
    
    navigate("/");
  };

  return (
    <div className="Top-bar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-Top-bar" />
      </div>

      <div>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">
              <i className="bi bi-house-door-fill me-1"></i>Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/perfil">
              <i className="bi bi-person-fill me-1"></i>Perfil
            </Link>
          </li>
          <li className="nav-item">
            <button className="logout-btn nav-link" onClick={handleLogoutClick}>
              <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
            </button>
          </li>
        </ul>
      </div>

      {showModal && (
        <div className="confirmation-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar cierre de sesión</h5>
                <button type="button" className="close-btn" onClick={handleCancelLogout}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas cerrar tu sesión?</p>
                <small>Tendrás que iniciar sesión nuevamente para acceder.</small>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={handleCancelLogout}>
                  Cancelar
                </button>
                <button className="confirm-btn" onClick={handleConfirmLogout}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
