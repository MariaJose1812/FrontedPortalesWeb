import "bootstrap/dist/css/bootstrap.min.css";
import { FaChalkboardTeacher, FaBook, FaQrcode, FaDesktop, FaChalkboard, FaVideo } from "react-icons/fa";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null); // Para guardar la información del usuario
  const [facultadId, setFacultadId] = useState<string>(""); // Para almacenar el facultadId

  // Obtener el userId desde localStorage
  const userId = localStorage.getItem('userId') || 'Usuario desconocido'; 

  useEffect(() => {
    // Llamar a la API para obtener los datos del alumno
    const fetchAlumnoData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/alumno/getAlumno`);
        const alumno = response.data.result.find((alumno: any) => alumno.alumnoId === userId);

        if (alumno) {
          setUser(alumno);
          setFacultadId(alumno.facultadId);  // Guardar el facultadId del alumno
        } else {
          console.error('Alumno no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener los datos del alumno:', error);
      }
    };

    if (userId !== 'Usuario desconocido') {
      fetchAlumnoData();
    }
  }, [userId]);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId'); // Eliminar el userId al cerrar sesión
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  const handleServiciosAcademicosClick = () => {
    console.log("FacultadId:", facultadId); // Verifica si el valor es correcto
    if (facultadId === 'IF01002') {
      console.log('Redirigiendo a /ICienciasComputacionPensum');
      navigate('/ICienciasComputacionPensum');
    } else if (facultadId === 'IG02002') {
      console.log('Redirigiendo a /IndustrialPensum');
      navigate('/IndustrialPensum');
    } else {
      console.log('Facultad no reconocida');
    }
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

          {/* Mostrar los datos del alumno */}
          {user && (
            <div className="user-info">
              <p className="user-label">Usuario: {user.alumnoId}</p>
              <p className="user-label">Nombre: {user.nombre}</p>
            </div>
          )}

          <div className="horizontal-cards-row">
            <Link to="#" className="horizontal-card btn-blue">
              <FaVideo className="card-icon" />
              <span className="card-text">Aula Virtual</span>
            </Link>

            <Link to="#" className="horizontal-card btn-blue">
              <FaBook className="card-icon" />
              <span className="card-text">Bibliotecas</span>
            </Link>

            <div className="horizontal-cards-row">
            <Link to="#" className="horizontal-card btn-green">
              <FaDesktop className="card-icon" />
              <span className="card-text">Registro Matricula</span>
            </Link>

           <button className="horizontal-card btn-blue" onClick={handleServiciosAcademicosClick}>
             <FaQrcode className="card-icon" />
             <span className="card-text">Servicios Academicos</span>
           </button>
          </div>

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

