import  { useState } from 'react';
import './Aprobadas.css';

const Aprobadas = () => {
  const [dniBusqueda, setDniBusqueda] = useState('');

  const handleBuscar = () => {
    console.log('Buscar por DNI:', dniBusqueda);
  };

  return (
    <div className="clases-aprobadas-container">
      <div className="busqueda-container">
        <label htmlFor="dniInput" className="dni-label">DNI</label>
        <input
          type="text"
          id="dniInput"
          className="dni-input"
          value={dniBusqueda}
          onChange={(e) => setDniBusqueda(e.target.value)}
          placeholder="Ingrese DNI del alumno"
        />
        <button className="buscar-button" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      <div className="tabla-container">
        <table className="clases-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aprobado</th>
              <th>ID Clase</th>
              <th>Nombre de la Clase</th>
              <th>DNI y Alumno</th>
            </tr>
          </thead>
          <tbody>
            
            <tr className="fila-vacia">
              <td colSpan={5}>No hay datos para mostrar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Aprobadas;