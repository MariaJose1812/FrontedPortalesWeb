import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './AprobadasAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Definir los tipos de datos
interface Clase {
  id_clase: number;
  nombre_clase: string;
}

interface Aprobada {
  id_clase: number;
}

const AprobadasAlumno = () => {
  const location = useLocation();
  const { dni, nombre } = location.state || { dni: '', nombre: '' };

  const [clasesAprobadas, setClasesAprobadas] = useState<Aprobada[]>([]);
  const [clases, setClases] = useState<Clase[]>([]);

  useEffect(() => {
    if (dni) {
      console.log('Cargando clases para el alumno con DNI:', dni); 

      axios.get(`http://localhost:3010/api/Aprobado/getAprobadoAlumno?alumnoId=${dni}`)
        .then(response => {
          const aprobadas = response.data.result || [];
          console.log('Clases aprobadas:', aprobadas); 
          setClasesAprobadas(aprobadas);
        })
        .catch(error => {
          console.error('Error al obtener clases aprobadas:', error);
          setClasesAprobadas([]); 
        });


      axios.get('http://localhost:3010/api/Clases/getClases')
        .then(response => {
          const listaClases = response.data.result || [];
          console.log('Lista de clases:', listaClases);
          setClases(listaClases);
        })
        .catch(error => {
          console.error('Error al obtener la lista de clases:', error);
          setClases([]); 
        });
    }
  }, [dni]);

  
  const obtenerNombreClase = (idClase: number): string => {
    const clase = clases.find(c => c.id_clase === idClase);
    if (!clase) {
      console.log('Clase no encontrada para id_clase:', idClase);
      return 'Desconocido'; 
    }
    console.log(`Clase encontrada para id_clase ${idClase}:`, clase.nombre_clase); 
    return clase.nombre_clase; 
  };

  return (
    <div className="alumno-aprobadas d-flex flex-column min-vh-100">
      

      <main className="flex-grow-1 py-4">
        <div className="container alumno-clases-container">
          <div className="alumno-card shadow-sm border-0">
            <div className="alumno-card-body p-4">
              <h2 className="alumno-title">Clases aprobadas</h2>

              <div className="alumno-busqueda-section">
                <div className="alumno-dni-container">
                  <label htmlFor="dniAlumno" className="alumno-dni-label">DNI:</label>
                  <div id="dniAlumno" className="alumno-dni-value">{dni}</div>
                  <span className="alumno-identificador">Alumno:</span>
                  <div className="alumno-nombre-value">{nombre}</div>
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
                    {clasesAprobadas.length > 0 ? (
                      clasesAprobadas.map(({ id_clase }) => (
                        <tr key={id_clase}>
                          <td>{id_clase}</td>
                          <td>{obtenerNombreClase(id_clase)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="alumno-fila-vacia">
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
