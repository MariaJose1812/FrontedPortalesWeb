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

const CivilPensum: React.FC = () => {
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
        { code: 'ES101', name: 'ESPAÑOL', credits: 3 },
        { code: '"LG214', name: 'SOCIOLOGÍA', credits: 3 },
        { code: 'MT101', name: 'MATEMÁTICAS', credits: 4 },
        { code: 'DB301', name: 'DIBUJO I', credits: 3 },
        { code: 'FI101', name: 'FILOSOFÍA', credits: 3 },
      ],
    },
    {
      number: 'II',
      courses: [
        { code: 'ES201', name: 'EXPRESIÓN ORAL Y ESCRITA', credits: 3 },
        { code: 'CNFS1', name: 'FÍSICA I', credits: 3 },
        { code: 'MT201', name: 'PRE CÁLCULO', credits: 4 },
        { code: 'DB301', name: 'DIBUJO TÉCNICO', credits: 3 },
        { code: 'CR201', name: 'EL HOMBRE FRENTE A LA VIDA', credits: 3 },
      ],
    },
    {
      number: 'III',
      courses: [
        { code: 'IQ201', name: 'ESTÁTICA', credits: 3 },
        { code: 'IG303', name: 'DINÁMICA', credits: 3 },
        { code: 'MT303', name: 'CÁLCULO I', credits: 4 },
        { code: 'MT301', name: 'ÁLGEBRA LINEAL', credits: 3 },
        { code: 'IG301', name: 'TOPOGRAFÍA', credits: 3 },
      ],
    },
    {
      number: 'IV',
      courses: [
        { code: 'IG402', name: 'MECÁNICA DE SÓLIDOS I', credits: 3 },
        { code: 'CNFS2', name: 'FÍSICA II', credits: 3 },
        { code: 'MT401', name: 'CÁLCULO II', credits: 4 },
        { code: 'IG403', name: 'MECÁNICA DE FLUIDOS', credits: 3 },
        { code: 'IG307', name: 'TOPOGRAFÍA APLICADA', credits: 3 },
      ],
    },
    {
      number: 'V',
      courses: [
        { code: 'IG327', name: 'MATERIALES Y PROCESOS DE CONSTRUCCIÓN', credits: 3 },
        { code: 'IG345', name: 'ANÁLISIS ESTRUCTURAL I', credits: 3 },
        { code: 'MT501', name: 'ECUACIONES DIFERENCIALES', credits: 3 },
        { code: 'MT202', name: 'ESTADÍSTICA I', credits: 4 },
        { code: 'IG333', name: 'HIDROLOGÍA', credits: 3 },
      ],
    },
    {
      number: 'VI',
      courses: [
        { code: 'IG337', name: 'MÉTODOS Y MAQUINARIA DE CONSTRUCCIÓN', credits: 3 },
        { code: 'IG345', name: 'ANÁLISIS ESTRUCTURAL II', credits: 3 },
        { code: 'EL101', name: 'ELECTIVA I )', credits: 3 },
        { code: 'IG332', name: 'INGENIERÍA HIDRÁULICA Y DE RIEGOS', credits: 3 },
        { code: 'CR204', name: 'ÉTICA PROFESIONAL', credits: 3 },
      ],
    },
    {
      number: 'VII',
      courses: [
        { code: 'CNLS1', name: 'MECÁNICA DE SUELOS ', credits: 3 },
        { code: 'IG345', name: 'ANÁLISIS ESTRUCTURAL III', credits: 3 },
        { code: 'HS101', name: 'HISTORIA DE HONDURAS', credits: 3 },
        { code: 'CNLS1', name: 'MECÁNICA DE SUELOS ', credits: 3 },
        { code: 'EL102', name: 'ELECTIVA II', credits: 3 },
      ],
    },
    {
      number: 'VIII',
      courses: [
        { code: 'IG393', name: 'SEMINARIO DE INVESTIGACIÓN', credits: 3 },
        { code: 'CNLR1', name: 'CONCRETO', credits: 3 },
        { code: 'IG347', name: 'GEOTECNIA', credits: 3 },
        { code: 'IG305', name: 'INGENIERÍA SANITARIA I', credits: 3 },
        { code: 'AD104', name: 'GESTIÓN DE LA CALIDAD TOTAL', credits: 3 },
      ],
    },
    {
      number: 'IX',
      courses: [
        { code: 'PR410', name: 'INGENIERÍA ECONÓMICA', credits: 3 },
        { code: 'IG365', name: 'DISEÑO DE ESTRUCTURAS DE CONCRETO', credits: 4 },
        { code: 'IG350', name: 'DISEÑO DE CIMENTACIONES', credits: 3 },
        { code: 'IG357', name: 'DISEÑO DE CARRETERAS Y CAMINOS', credits: 3 },
        { code: 'MT304', name: 'CONTROL ESTADÍSTICO DE LA CALIDAD', credits: 3 },
      ],
    },
    {
      number: 'X',
      courses: [
        { code: 'IG392', name: 'ASPECTOS LEGALES DE LA INGENIERÍA CIVIL', credits: 3 },
        { code: 'IG367', name: 'DISEÑO DE PAVIMENTOS', credits: 3 },
        { code: 'IG407', name: 'DISEÑO DE ESTRUCTURAS METÁLICAS', credits: 3 },
        { code: 'IG409', name: 'INGENIERÍA SANITARIA II', credits: 3 },
        { code: 'CR501', name: 'DOCTRINA SOCIAL DE LA IGLESIA', credits: 3 },
      ],
    },
    {
      number: 'XI',
      courses: [
        { code: 'IG370', name: 'COSTOS Y PRESUPUESTO DE OBRAS', credits: 3 },
        { code: 'EL103', name: 'ELECTIVA III )', credits: 3 },
        { code: 'IG388', name: 'OBRAS DE MITIGACIÓN', credits: 3 },
        { code: 'IG372', name: 'DISEÑO DE INSTALACIONES ELECTRICAS', credits: 3 },
        { code: 'IG380', name: 'OBRAS CIVILES ASISTIDO POR COMPUTADORA', credits: 3 },
      ],
    },
    {
      number: 'XII',
      courses: [
        { code: 'IG385', name: 'FORMULACIÓN Y EVALUACIÓN DE PROYECTOS DE CONSTRUCCIÓN', credits: 3 },
        { code: 'IG513', name: 'DISEÑO DE PUENTES', credits: 3 },
        { code: 'IG391', name: 'TALLER DE DISEÑO COMBINADO', credits: 3 },
        { code: 'IG509', name: 'DISEÑO DE URBANIZACIONES', credits: 3 },
        { code: 'AD402', name: 'PLANEACIÓN Y DISEÑO DE UN MODELO DE CALIDAD', credits: 3 },
      ],
    },
    {
      number: 'XIII',
      courses: [
        { code: 'IF400', name: 'PRÁCTICA PROFESIONAL SUPERVISADA', credits: 3 }
      ],
    },
  ];

  return (
    <div className="ingenieria-civil-container">
      <div className="header">
        <h1>PLAN DE ESTUDIOS</h1>
        <h2>Ingeniería Civil</h2>
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

export default CivilPensum;