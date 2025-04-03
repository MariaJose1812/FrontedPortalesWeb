import { useState } from 'react';
import './AprobadasAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AprobadasAlumno = () => {
  const [dniAlumno] = useState(''); // Eliminada la función setDniAlumno ya que no será editable
  const [nombreAlumno] = useState('');

  return (
    <div className="alumno-aprobadas d-flex flex-column min-vh-100">
      <header className="alumno-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <img src="logo.png" alt="Logo" className="alumno-logo" />
            <h1 className="text-white mb-0 d-none d-md-block">Mis Clases Aprobadas</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow-1 py-4">
        <div className="container alumno-clases-container">
          <div className="alumno-card shadow-sm border-0">
            <div className="alumno-card-body p-4">
              <h2 className="alumno-title">Clases aprobadas</h2>
              
              <div className="alumno-busqueda-section">
                <div className="alumno-dni-container">
                  <label htmlFor="dniAlumno" className="alumno-dni-label">DNI:</label>
                  <div 
                    id="dniAlumno"
                    className="alumno-dni-value"
                  >
                    {dniAlumno}
                  </div>
                  <span className="alumno-identificador">Alumno:</span>
                  <div className="alumno-nombre-value">
                    {nombreAlumno}
                  </div>
                </div>
              </div>
              
              <div className="alumno-tabla-container mt-4">
                <table className="alumno-clases-table table">
                  <thead>
                    <tr>
                      <th>Código de Clase</th>
                      <th>Nombre de la Clase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="alumno-fila-vacia">
                      <td colSpan={2}>No hay clases aprobadas registradas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="alumno-footer mt-auto">
        <div className="container">
          <p className="mb-0">
            © {new Date().getFullYear()} Universidad Católica de Honduras. Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AprobadasAlumno;