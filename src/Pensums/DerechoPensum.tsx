import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ICienciasComputaciónPensum.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

interface Course {
  code: string;
  name: string;
  credits?: number;
  prerequisite?: string;
  requiredFor?: string;
}

interface Semester {
  number: string;
  courses: Course[];
}

const DerechoPensum: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [approvedCourses, setApprovedCourses] = useState<Set<string>>(new Set());
  const [loadingCourseCode, setLoadingCourseCode] = useState<string | null>(null); 
  const [showCheck, setShowCheck] = useState<boolean>(false); 
  
  const location = useLocation();
  const { dni, nombre } = location.state || {};
  
  const togglePending = async (course: Course) => {
    setLoading(true);
    setLoadingCourseCode(course.code); 
    setShowCheck(false); 

    if (!dni) {
      alert('No se encontró el DNI del alumno');
      setLoading(false);
      setLoadingCourseCode(null);
      return;
    }

    try {
      let response;
      if (approvedCourses.has(course.code)) {
        // Eliminar curso aprobado
        response = await fetch('http://localhost:3010/api/Aprobado/deleteAprobado', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_aprobado: course.code }),
        });
      } else {
        // Insertar curso aprobado
        response = await fetch('http://localhost:3010/api/Aprobado/insertAprobado', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ alumnoId: dni, id_clase: course.code, nota_final: 100 }),
        });
      }

      if (response.ok) {
        setApprovedCourses(prev => {
          const newSet = new Set(prev);
          if (approvedCourses.has(course.code)) {
            newSet.delete(course.code); 
          } else {
            newSet.add(course.code); 
          }
          return newSet;
        });
        
        setShowCheck(true); 
      } else {
        console.error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setLoading(false);
      setLoadingCourseCode(null); 
    }
  };

  useEffect(() => {
    const fetchApprovedCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3010/api/Aprobado/getAprobado?alumnoId=${dni}`);
        if (response.ok) {
          const data = await response.json();
          const approvedCourseCodes = new Set<string>(data.result.map((item: { id_clase: string }) => item.id_clase));
          setApprovedCourses(approvedCourseCodes);
        } else {
          console.error('Error al obtener los cursos aprobados');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
      }
    };

    if (dni) {
      fetchApprovedCourses();
    }
  }, [dni]);

  const semesters: Semester[] = [
    {
      number: 'I',
      courses: [
        { code: 'MT101', name: 'MATEMÁTICAS', credits: 4 },
        { code: 'SC101', name: 'SOCIOLOGÍA', credits: 3 },
        { code: 'LG101', name: 'INTRODUCCIÓN AL ESTUDIO DEL DERECHO', credits: 3 },
        { code: 'FI101', name: 'FILOSOFÍA', credits: 3 },
        { code: 'ES101', name: 'ESPAÑOL', credits: 3 },
      ],
    },
    {
      number: 'II',
      courses: [
        { code: 'MT202', name: 'ESTADÍSTICA I', credits: 4 },
        { code: 'LG207', name: 'TEORÍA GENERAL DEL PROCESO', credits: 3 },
        { code: 'LG204', name: 'DERECHO ROMANO', credits: 3 },
        { code: 'LG212', name: 'TEORÍA POLÍTICA', credits: 3 },
        { code: 'ES201', name: 'EXPRESIÓN ORAL Y ESCRITA', credits: 3 },
      ],
    },
    {
      number: 'III',
      courses: [
        { code: 'HS101', name: 'HISTORIA DE HONDURAS', credits: 3 },
        { code: 'LG205', name: 'DERECHO PENAL I', credits: 4 },
        { code: 'LG303', name: 'DERECHO CIVIL I', credits: 4 },
        { code: 'LG308', name: 'TEORÍA DEL ESTADO', credits: 3 },
        { code: 'LG209', name: 'DERECHO DEL TRABAJO Y SEGURIDAD SOCIAL I', credits: 3 },
      ],
    },
    {
      number: 'IV',
      courses: [
        { code: 'LG306', name: 'DERECHO PROCESAL CIVIL I', credits: 3 },
        { code: 'LG305', name: 'DERECHO PENAL II', credits: 3 },
        { code: 'LG402', name: 'DERECHO CIVIL II', credits: 4 },
        { code: 'LG318', name: 'DERECHO CONSTITUCIONAL', credits: 3 },
        { code: 'LG310', name: 'DERECHO DEL TRABAJO Y SEGURIDAD SOCIAL II', credits: 3 },
      ],
    },
    {
      number: 'V',
      courses: [
        { code: 'LG317', name: 'DERECHO PROCESAL CIVIL II', credits: 3 },
        { code: 'LG414', name: 'DERECHOS DE LA NIÑEZ Y LA MUJER', credits: 3 },
        { code: 'LG304', name: 'DERECHO CIVIL III', credits: 4 },
        { code: 'LG314', name: 'DERECHO ADMINISTRATIVO I', credits: 3 },
        { code: 'CR201', name: 'EL HOMBRE FRENTE A LA VIDA', credits: 3 },
      ],
    },
    {
      number: 'VI',
      courses: [
        { code: 'LG221', name: 'PSICOLOGÍA APLICADA AL DERECHO', credits: 3 },
        { code: 'LG214', name: 'SOCIOLOGÍA DEL DERECHO', credits: 3 },
        { code: 'LG307', name: 'DERECHO CIVIL IV', credits: 4 },
        { code: 'LG324', name: 'DERECHO ADMINISTRATIVO II', credits: 3 },
        { code: 'IF101', name: 'INFORMÁTICA I', credits: 3 },
      ],
    },
    {
      number: 'VII',
      courses: [
        { code: 'AD302', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN', credits: 3 },
        { code: 'LG348', name: 'LÓGICA Y ARGUMENTACIÓN JURÍDICA', credits: 3 },
        { code: 'LG309', name: 'DERECHO CIVIL V', credits: 4 },
        { code: 'LG334', name: 'DERECHO TRIBUTARIO', credits: 3 },
        { code: 'LG215', name: 'INFORMÁTICA JURÍDICA', credits: 3 },
      ],
    },
    {
      number: 'VIII',
      courses: [
        { code: 'LG325', name: 'LEGISLACIÓN PENAL ESPECIAL', credits: 3 },
        { code: 'LG410', name: 'DERECHO INTERNACIONAL PÚBLICO', credits: 3 },
        { code: 'LG404', name: 'DERECHO MERCANTIL I', credits: 3 },
        { code: 'LG206', name: 'REDACCIÓN Y ORATORIA FORENSE', credits: 3 },
        { code: 'LG510', name: 'DERECHOS HUMANOS', credits: 3 },
      ],
    },
    {
      number: 'IX',
      courses: [
        { code: 'LG211', name: 'DERECHO AGRARIO', credits: 3 },
        { code: 'LG358', name: 'DERECHO NOTARIAL', credits: 3 },
        { code: 'LG501', name: 'DERECHO MERCANTIL II', credits: 3 },
        { code: 'LG356', name: 'DERECHO DE LA PROPIEDAD INTELECTUAL Y COMUNICACIONES', credits: 3 },
        { code: 'LG320', name: 'DERECHO AMBIENTAL', credits: 3 },
      ],
    },
    {
      number: 'X',
      courses: [
        { code: 'LG508', name: 'DERECHO DE INTEGRACIÓN', credits: 3 },
        { code: 'LG355', name: 'DERECHO INTERNACIONAL PRIVADO', credits: 3 },
        { code: 'LG396', name: 'PRÁCTICA FORENSE CIVIL', credits: 3 },
        { code: 'LG397', name: 'PRÁCTICA FORENSE PENAL', credits: 3 },
        { code: 'LG398', name: 'PRÁCTICA FORENSE LABORAL', credits: 3 },
      ],
    },
    {
      number: 'XI',
      courses: [
        { code: 'AD104', name: 'GESTIÓN DE LA CALIDAD TOTAL', credits: 3 },
        { code: 'LG240', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN JURÍDICA', credits: 3 },
        { code: 'LG369', name: 'DERECHO MERCANTIL ESPECIAL', credits: 3 },
        { code: 'LG213', name: 'FILOSOFÍA DEL DERECHO', credits: 3 },
        { code: 'CR501', name: 'DOCTRINA SOCIAL DE LA IGLESIA', credits: 3 },
      ],
    },
    {
      number: 'XII',
      courses: [
        { code: 'MT304', name: 'CONTROL ESTADÍSTICO DE LA CALIDAD', credits: 3 },
        { code: 'LG316', name: 'DERECHO COMPARADO', credits: 3 },
        { code: 'LG399', name: 'MÉTODOS ALTERNOS DE SOLUCIÓN DE CONTROVERSIAS', credits: 3 },
        { code: 'LG270', name: 'DERECHO CANÓNICO', credits: 3 },
        { code: 'LG241', name: 'ÉTICA JURÍDICA', credits: 3 },
      ],
    },
    {
      number: 'XIII',
      courses: [
        { code: 'AD402', name: 'PLANEACIÓN Y DISEÑO DE UN MODELO DE CALIDAD', credits: 3 },
        { code: 'LG999', name: 'CICLO DE CLÍNICAS PROCESALES', credits: 3 },
        { code: 'LG999', name: 'ORDENAMIENTO TERRITORIAL', credits: 3 },
      ],
    },
  ];

  return (
    <div className="derecho-container">
      <div className="header">
        <h1>PLAN DE ESTUDIOS</h1>
        <h2>Derecho</h2>
        <div className="labels-container">
          <label><strong>DNI:</strong> {dni}</label>
          <label><strong>NOMBRE:</strong> {nombre}</label>
        </div>
      </div>

      <div className="container">
        {semesters.map((semester, index) => (
          <div key={index} className="period">
            <div className="period-number">{semester.number}</div>
            <div className="cards">
              {semester.courses.map((course, courseIndex) => (
                <div
                  key={courseIndex}
                  className="card"
                  onClick={() => setSelectedCourse(course)}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className={`card-title ${approvedCourses.has(course.code) ? 'approved-course' : ''}`}
                    style={{
                      backgroundColor: approvedCourses.has(course.code) ? '#28a745' : '#F2A900',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '10px',
                      textAlign: 'center',
                    }}
                  >
                    {course.code}
                  </div>
                  <div className="card-name">{course.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal show={!!selectedCourse} onHide={() => setSelectedCourse(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourse?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{selectedCourse?.code}</strong> | Créditos: {selectedCourse?.credits}
          </p>
          
          {selectedCourse && (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={approvedCourses.has(selectedCourse.code)}
                  onChange={() => togglePending(selectedCourse)}
                  disabled={loading || loadingCourseCode === selectedCourse.code}
                  className="custom-checkbox" 
                />
                {loading && loadingCourseCode === selectedCourse.code ? (
                  <Spinner animation="border" size="sm" style={{ marginLeft: '10px' }} />
                ) : (
                  approvedCourses.has(selectedCourse.code) ? 'Desmarcar' : 'Marcar' 
                )}
                {showCheck && approvedCourses.has(selectedCourse.code) && !loading && !loadingCourseCode && (
                  <span style={{ marginLeft: '10px', color: '#28a745' }}>✔️</span>
                )}
              </label>
            </div>
          )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setSelectedCourse(null)}>
      Cerrar
    </Button>
  </Modal.Footer>
</Modal>  
      </div>
    );
  }

export default DerechoPensum;