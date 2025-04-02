import { useState } from 'react';
import './Aprobadas.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Aprobadas = () => {
  const [dniBusqueda, setDniBusqueda] = useState('');
  const [nombre] = useState('');
  const [facultad] = useState('');

  const handleBuscar = () => {
    console.log('Buscar por DNI:', dniBusqueda);
  };

  return (
    <div className="ucah-aprobadas d-flex flex-column min-vh-100">
      {/* Barra superior moderna */}
      <header className="ucah-header-bar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <img src="logo.png" alt="Logo" className="ucah-logo" />
            <h1 className="text-white mb-0 d-none d-md-block">Clases Aprobadas</h1>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow-1 py-4">
        <div className="container ucah-clases-aprobadas-container">
          <div className="ucah-card shadow-sm border-0">
            <div className="ucah-card-body p-4">
              <h2 className="ucah-title">Consulta de clases aprobadas</h2>
              
              {/* Sección de búsqueda reorganizada */}
              <div className="ucah-search-section">
                {/* Campo DNI */}
                <div className="ucah-busqueda-container">
                  <label htmlFor="dniInput" className="ucah-dni-label">ID:</label>
                  <input
                    type="text"
                    id="dniInput"
                    className="ucah-dni-input form-control"
                    value={dniBusqueda}
                    onChange={(e) => setDniBusqueda(e.target.value)}
                    placeholder="Ingrese ID"
                  />
                </div>
                
                {/* Botón de búsqueda */}
                <button 
                  className="ucah-buscar-button btn btn-primary"
                  onClick={handleBuscar}
                >
                  Buscar
                </button>
                
                {/* Información del alumno (solo lectura) */}
                <div className="row g-3 mt-3">
                  <div className="col-md-6">
                    <div className="ucah-info-container">
                      <label htmlFor="nombre" className="ucah-info-label">Alumno:</label>
                      <input
                        type="text"
                        id="nombre"
                        className="ucah-info-input form-control"
                        value={nombre}
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="ucah-info-container">
                      <label htmlFor="facultad" className="ucah-info-label">Facultad:</label>
                      <input
                        type="text"
                        id="facultad"
                        className="ucah-info-input form-control"
                        value={facultad}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tabla más grande */}
              <div className="ucah-tabla-container mt-4">
                <table className="ucah-clases-table table">
                  <thead>
                    <tr>
                      <th>ID Clase</th>
                      <th>Nombre de la Clase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="ucah-fila-vacia">
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
      <footer className="ucah-footer-bar mt-auto">
        <div className="container">
          <p className="mb-0">
            © {new Date().getFullYear()} Universidad Católica de Honduras. Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Aprobadas;
