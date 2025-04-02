import { useState } from 'react';
import './Aprobadas.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Aprobadas = () => {
  const [dniBusqueda, setDniBusqueda] = useState('');
  const [nombre, setNombre] = useState('');
  const [facultad, setFacultad] = useState('');

  const handleBuscar = () => {
    console.log('Buscar por DNI:', dniBusqueda);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Barra superior moderna */}
      <header className="header-bar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <img src="logo.png" alt="Logo" className="logo" />
            <h1 className="text-white mb-0 d-none d-md-block">Sistema de Clases Aprobadas</h1>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow-1 py-4">
        <div className="container clases-aprobadas-container">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 mb-4">Consulta de clases aprobadas</h2>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="busqueda-container">
                    <label htmlFor="dniInput" className="dni-label form-label">DNI:</label>
                    <input
                      type="text"
                      id="dniInput"
                      className="dni-input form-control"
                      value={dniBusqueda}
                      onChange={(e) => setDniBusqueda(e.target.value)}
                      placeholder="Ingrese DNI"
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="info-container">
                    <label htmlFor="nombre" className="info-label form-label">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      className="info-input form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Nombre del alumno"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="info-container">
                    <label htmlFor="facultad" className="info-label form-label">Facultad:</label>
                    <input
                      type="text"
                      id="facultad"
                      className="info-input form-control"
                      value={facultad}
                      onChange={(e) => setFacultad(e.target.value)}
                      placeholder="Facultad"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="col-12">
                  <button 
                    className="buscar-button btn btn-primary"
                    onClick={handleBuscar}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              
              <div className="tabla-container mt-4">
                <table className="clases-table table">
                  <thead>
                    <tr>
                      <th>ID Clase</th>
                      <th>Nombre de la Clase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fila-vacia">
                      <td colSpan={2}>No hay datos para mostrar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Barra inferior moderna */}
      <footer className="footer-bar mt-auto">
        <div className="container">
          <p className="mb-0">
            © {new Date().getFullYear()} Universidad Católica de Honduras - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Aprobadas;