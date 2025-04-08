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

const MercadotecniaPensum: React.FC = () => {
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
       
        response = await fetch('http://localhost:3010/api/Aprobado/deleteAprobado', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_aprobado: course.code }),
        });
      } else {
       
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
        { code: 'MT101', name: 'MATEMÁTICAS', credits: 4 },
        { code: 'IF101', name: 'INFORMÁTICA I', credits: 4 },
        { code: 'LG214', name: 'SOCIOLOGÍA', credits: 3 },
        { code: 'FI101', name: 'FILOSOFÍA', credits: 3 },
      ],
    },
    {
      number: 'II',
      courses: [
        { code: 'ES201', name: 'EXPRESIÓN ORAL Y ESCRITA', credits: 3 },
        { code: 'MT201', name: 'PRE-CÁLCULO', credits: 4 },
        { code: 'IF201', name: 'INFORMÁTICA II', credits: 3 },
        { code: 'AD101', name: 'ADMINISTRACIÓN I', credits: 3 },
        { code: 'CR201', name: 'EL HOMBRE FRENTE A LA VIDA', credits: 3 },
      ],
    },
    {
      number: 'III',
      courses: [
        { code: 'CT201', name: 'CONTABILIDAD I', credits: 3 },
        { code: 'MT202', name: 'ESTADÍSTICA I', credits: 4 },
        { code: 'AD207', name: 'PSICOLOGÍA I', credits: 3 },
        { code: 'AD201', name: 'ADMINISTRACIÓN II', credits: 3 },
        { code: 'HS101', name: 'HISTORIA DE HONDURAS', credits: 3 },
      ],
    },
    {
      number: 'IV',
      courses: [
        { code: 'CT301', name: 'CONTABILIDAD II', credits: 3 },
        { code: 'MT302', name: 'ESTADÍSTICA II', credits: 4 },
        { code: 'AD302', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN', credits: 3 },
        { code: 'FI102', name: 'CIENCIA Y TECNOLOGÍA', credits: 3 },
        { code: 'MC201', name: 'MERCADOTECNIA I', credits: 3 },
      ],
    },
    {
      number: 'V',
      courses: [
        { code: 'CT403', name: 'CONTABILIDAD ADMINISTRATIVA I', credits: 3 },
        { code: 'MC301', name: 'INVESTIGACIÓN DE MERCADOS I', credits: 3 },
        { code: 'LG201', name: 'LEGISLACIÓN EMPRESARIAL', credits: 3 },
        { code: 'AD202', name: 'ADMINISTRACIÓN DE RECURSOS HUMANOS', credits: 3 },
        { code: 'MC304', name: 'MERCADOTECNIA II', credits: 3 },
      ],
    },
    {
      number: 'VI',
      courses: [
        { code: 'CE201', name: 'MICROECONOMÍA', credits: 3 },
        { code: 'MT204', name: 'MATEMÁTICAS FINANCIERA', credits: 3 },
        { code: '', name: 'INVESTIGACIÓN DE MERCADOS II', credits: 3 },
        { code: 'AD314', name: 'RELACIONES DE TRABAJO EN LA EMPRESA', credits: 3 },
        { code: 'CC301', name: 'COMPORTAMIENTO DEL CONSUMIDOR', credits: 3 },
      ],
    },
    {
      number: 'VII',
      courses: [
        { code: 'CE304', name: 'MACROECONOMÍA', credits: 3 },
        { code: 'FZ301', name: 'ADMINISTRACIÓN FINANCIERA I', credits: 3 },
        { code: 'MC402', name: 'VENTAS', credits: 3 },
        { code: 'AD403', name: 'COMPORTAMIENTO HUMANO Y DESARROLLO ORGANIZACIONAL', credits: 3 },
        { code: 'MC410', name: 'PUBLICIDAD I', credits: 3 },
      ],
    },
    {
      number: 'VIII',
      courses: [
        { code: 'PR408', name: 'INVESTIGACIÓN DE OPERACIONES APLICADA A LA ADMINISTRACIÓN', credits: 3 },
        { code: 'FZ401', name: 'ADMINISTRACIÓN FINANCIERA II', credits: 3 },
        { code: 'MC501', name: 'PROMOCIÓN DE VENTAS', credits: 3 },
        { code: 'MC411', name: 'POLÍTICAS DE MERCADOTECNIA', credits: 3 },
        { code: 'MC504', name: 'PUBLICIDAD II', credits: 3 },
      ],
    },
    {
      number: 'IX',
      courses: [
        { code: 'MC505', name: 'ANÁLISIS DE PRECIOS', credits: 3 },
        { code: '', name: 'PLANIFICACIÓN ESTRATÉGICA', credits: 3 },
        { code: 'MC506', name: 'MERCADOTECNIA SOCIAL', credits: 3 },
        { code: 'MC507', name: 'MERCADOTECNIA DE SERVICIOS', credits: 3 },
        { code: '', name: 'NEGOCIOS INTERNACIONALES Y DESARROLLO DE EXPORTACIONES', credits: 3 },
      ],
    },
    {
      number: 'X',
      courses: [
        { code: 'AD104', name: 'GESTIÓN DE LA CALIDAD TOTAL', credits: 3 },
        { code: 'MC413', name: 'DISTRIBUCIÓN FÍSICA Y LOGÍSTICA', credits: 3 },
        { code: 'MC508', name: 'MERCADOTECNIA TURÍSTICA', credits: 3 },
        { code: 'MC308', name: 'MERCADOTECNIA PARA INSTITUCIONES FINANCIERAS', credits: 3 },
        { code: 'MC412', name: 'COMERCIO INTERNACIONAL', credits: 3 },
      ],
    },
    {
      number: 'XI',
      courses: [
        { code: 'MT304', name: 'CONTROL ESTADÍSTICO DE LA CALIDAD', credits: 3 },
        { code: 'MC510', name: 'DESARROLLO DE PRODUCTOS', credits: 3 },
        { code: 'MP501', name: 'MERCHANDISING Y DISEÑO PUBLICITARIO', credits: 3 },
        { code: 'CR204', name: 'ÉTICA PROFESIONAL', credits: 3 },
        { code: 'MC511', name: 'MERCADOTECNIA INTERNACIONAL', credits: 3 },
      ],
    },
    {
      number: 'XII',
      courses: [
        { code: '', name: 'PLANIFICACIÓN Y DISEÑO DE SISTEMAS DE CALIDAD', credits: 3 },
        { code: 'AD401', name: 'FORMULACIÓN Y EVALUACIÓN DE PROYECTOS', credits: 3 },
        { code: 'MC502', name: 'SEMINARIO DE MERCADOTECNIA', credits: 0 },
        { code: 'MC512', name: 'NEGOCIOS ELECTRÓNICOS', credits: 3 },
        { code: 'CR501', name: 'DOCTRINA SOCIAL DE LA IGLESIA', credits: 0 },
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
    <div className="mercadotecnia-container">
      <div className="header">
        <h1>PLAN DE ESTUDIOS</h1>
        <h2>Mercadotecnia</h2>
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

export default MercadotecniaPensum;