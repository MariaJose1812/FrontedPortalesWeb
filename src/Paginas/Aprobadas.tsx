import { useState } from 'react';
import './Aprobadas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Aprobadas = () => {
  const [dniBusqueda, setDniBusqueda] = useState('');
  const [nombre, setNombre] = useState('');
  const [facultad, setFacultad] = useState('');
  const [error, setError] = useState('');
  const [clasesAprobadas, setClasesAprobadas] = useState<any[]>([]); 
  const [clases, setClases] = useState<any[]>([]); 

  const facultades: { [key: string]: string } = {
    "CE02002": "Mercadotecnia",
    "CE03100": "Gestión Estratégica de Empresas",
    "COP": "Coprogramáticas",
    "CRO1001": "Clases Sello",
    "EF010": "Enfermería",
    "EGO 1001": "Estudios Generales",
    "IDINO 1001": "Diplomado Inglés",
    "IF01002": "Ingeniería en Ciencias de la Computación",
    "IG02002": "Ingeniería Industrial",
    "IG04001": "Ingeniería Civil",
    "LGO 1002": "Derecho",
    "MD01102": "Doctor en Medicina y Cirugía",
    "PSO1001": "Psicología"
  };

  const obtenerNombreClase = (idClase: string): string => {
    const clase = clases.find((c: any) => c.id_clase === idClase);
    return clase ? clase.nombre_clase : 'Clase desconocida';
  };

  const handleBuscar = async () => {
    setError(''); 
    try {
      const response = await fetch(`http://localhost:3010/api/Alumno/getAlumnoId?alumnoId=${dniBusqueda}`);
      
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Error desconocido');
      }
  
      const data = await response.json();
  
      if (data.alumno) {
        setNombre(data.alumno.nombre);
        setFacultad(facultades[data.alumno.facultadId] || 'Facultad no encontrada');

        const aprobadasResponse = await axios.get(`http://localhost:3010/api/Aprobado/getAprobadoAlumno?alumnoId=${dniBusqueda}`);
        setClasesAprobadas(aprobadasResponse.data.result || []);
      } else {
        setError('Alumno no encontrado');
      }
      const clasesResponse = await axios.get('http://localhost:3010/api/Clases/getClases');
      setClases(clasesResponse.data.result || []); 
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error en la búsqueda:', error.message);
        setError(`Error: ${"alumno no encontrado"}`);
      } else {
        console.error('Error desconocido:', error);
        setError('Error desconocido en la búsqueda');
      }
    }
  };

  return (
    <div className="ucah-aprobadas d-flex flex-column min-vh-100">
      <header className="ucah-header-bar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <img src="logo.png" alt="Logo" className="ucah-logo" />
            <h1 className="text-white mb-0 d-none d-md-block">Clases Aprobadas</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow-1 py-4">
        <div className="container ucah-clases-aprobadas-container">
          <div className="ucah-card shadow-sm border-0">
            <div className="ucah-card-body p-4">
              <h2 className="ucah-title">Consulta de clases aprobadas</h2>
              
              <div className="ucah-search-section">
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
                
                <button 
                  className="ucah-buscar-button btn btn-primary"
                  onClick={handleBuscar}
                >
                  Buscar
                </button>

                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
                
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

              <div className="ucah-tabla-container mt-4">
                <table className="ucah-clases-table table">
                  <thead>
                    <tr>
                      <th>Código de Clase</th>
                      <th>Nombre de la Clase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clasesAprobadas.length > 0 ? (
                      clasesAprobadas.map(({ id_clase }: any) => (
                        <tr key={id_clase}>
                          <td>{id_clase}</td>
                          <td className="faculty-name">{obtenerNombreClase(id_clase)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="ucah-fila-vacia">
                        <td colSpan={2}>No hay clases aprobadas registradas</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

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
