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

const IndustrialPensum: React.FC = () => {
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
        { code: 'HS101', name: 'HISTORIA DE HONDURAS', credits: 3 },
        { code: 'MT101', name: 'MATEMÁTICAS', credits: 3 },
        { code: 'SC101', name: 'SOCIOLOGÍA', credits: 3 },
        { code: 'ES101', name: 'ESPAÑOL', credits: 3 },
        { code: 'FI101', name: 'FILOSOFÍA', credits: 3 },
      ],
    },
    {
      number: 'II',
      courses: [
        { code: 'CSL1-ESPF1', name: 'ELECTIVA I - ÁREA INSTITUCIONALES', credits: 3 },
        { code: 'MT202', name: 'ESTADÍSTICA I', credits: 3 },
        { code: 'MT201', name: 'PRE-CÁLCULO', credits: 3 },
        { code: 'ES201', name: 'EXPRESIÓN ORAL Y ESCRITA', credits: 3 },
        { code: 'CR201', name: 'EL HOMBRE FRENTE A LA VIDA', credits: 3 },
      ],
    },
    {
      number: 'III',
      courses: [
        { code: 'DI101', name: 'DIBUJO I', credits: 3 },
        { code: 'MT203', name: 'ESTADÍSTICA II', credits: 3 },
        { code: 'MT303', name: 'CÁLCULO I', credits: 3 },
        { code: 'AL101', name: 'ÁLGEBRA LINEAL', credits: 3 },
        { code: 'AD101', name: 'ADMINISTRACIÓN I', credits: 3 },
      ],
    },
    {
      number: 'IV',
      courses: [
        { code: 'DI102', name: 'DISEÑO INDUSTRIAL ASISTIDO POR COMPUTADORA', credits: 3 },
        { code: 'LG240', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN', credits: 3 },
        { code: 'MT401', name: 'CÁLCULO II', credits: 3 },
        { code: 'FS301', name: 'FÍSICA I', credits: 3 },
        { code: 'Q101', name: 'QUÍMICA I', credits: 3 },
      ],
    },
    {
      number: 'V',
      courses: [
        { code: 'PR407', name: 'INVESTIGACIÓN DE OPERACIONES I', credits: 3 },
        { code: 'ED101', name: 'ECUACIONES DIFERENCIALES', credits: 3 },
        { code: 'CT201', name: 'CONTABILIDAD I', credits: 3 },
        { code: 'FS302', name: 'FÍSICA II', credits: 3 },
        { code: 'CN201', name: 'ELECTIVA II - ÁREA CIENCIAS NATURALES', credits: 3 },
      ],
    },
    {
      number: 'VI',
      courses: [
        { code: 'IO102', name: 'INVESTIGACIÓN DE OPERACIONES II', credits: 3 },
        { code: 'IM101', name: 'INGENIERÍA DE MÉTODOS I', credits: 3 },
        { code: 'PL101', name: 'PRODUCCIÓN LIMPIA Y ENERGÍAS ALTERNATIVAS', credits: 3 },
        { code: 'CC101', name: 'CONTABILIDAD DE COSTOS PARA INGENIERÍA INDUSTRIAL', credits: 3 },
        { code: 'ET101', name: 'ESTÁTICA', credits: 3 },
      ],
    },
    {
      number: 'VII',
      courses: [
        { code: 'AP101', name: 'ADMINISTRACIÓN DE LA PRODUCCIÓN Y OPERACIONES', credits: 3 },
        { code: 'IM102', name: 'INGENIERÍA DE MÉTODOS II', credits: 3 },
        { code: 'IE101', name: 'INSTALACIONES ELÉCTRICAS', credits: 3 },
        { code: 'EP101', name: 'ÉTICA PROFESIONAL', credits: 3 },
        { code: 'MS101', name: 'MECÁNICA DE SÓLIDOS I', credits: 3 },
      ],
    },
    {
      number: 'VIII',
      courses: [
        { code: 'ER101', name: 'ERGONOMÍA', credits: 3 },
        { code: 'ALP101', name: 'ALGORITMOS Y LENGUAJES DE PROGRAMACIÓN', credits: 3 },
        { code: 'MK101', name: 'MERCADOTECNIA I', credits: 3 },
        { code: 'GRH101', name: 'GESTIÓN DE RECURSOS HUMANOS', credits: 3 },
        { code: 'CM101', name: 'CIENCIAS DE LOS MATERIALES', credits: 3 },
      ],
    },
    {
      number: 'IX',
      courses: [
        { code: 'SP101', name: 'SIMULACIÓN DE PROCESOS', credits: 3 },
        { code: 'DP101', name: 'DISEÑO DE PLANTA Y MANEJO DE MATERIALES', credits: 3 },
        { code: 'MF101', name: 'MECÁNICA DE FLUIDOS APLICADA', credits: 3 },
        { code: 'GCT101', name: 'GESTIÓN DE LA CALIDAD TOTAL', credits: 3 },
        { code: 'AF101', name: 'ADMINISTRACIÓN FINANCIERA', credits: 3 },
      ],
    },
    {
      number: 'X',
      courses: [
        { code: 'LCS101', name: 'LOGÍSTICA Y CADENA DE SUMINISTRO', credits: 3 },
        { code: 'ISP101', name: 'INGENIERÍA EN SISTEMAS DE PRODUCCIÓN I', credits: 3 },
        { code: 'DSI101', name: 'DOCTRINA SOCIAL DE LA IGLESIA', credits: 3 },
        { code: 'CEC101', name: 'CONTROL ESTADÍSTICO DE LA CALIDAD', credits: 3 },
        { code: 'IE101', name: 'INGENIERÍA ECONÓMICA', credits: 3 },
      ],
    },
    {
      number: 'XI',
      courses: [
        { code: 'FEP101', name: 'FORMULACIÓN Y EVALUACIÓN DE PROYECTOS', credits: 3 },
        { code: 'ISP102', name: 'INGENIERÍA EN SISTEMAS DE PRODUCCIÓN II', credits: 3 },
        { code: 'SA101', name: 'SISTEMAS AUTOMATIZADOS', credits: 3 },
        { code: 'PDM101', name: 'PLANEACIÓN Y DISEÑO DE UN MODELO DE CALIDAD', credits: 3 },
        { code: 'LE101', name: 'LEGISLACIÓN EMPRESARIAL', credits: 3 },
      ],
    },
    {
      number: 'XII',
      courses: [
        { code: 'AEI101', name: 'ANÁLISIS Y ESTRATEGIA DE LA INDUSTRIA', credits: 3 },
        { code: 'ISMI101', name: 'INGENIERÍA EN SISTEMAS DE MANTENIMIENTO INDUSTRIAL', credits: 3 },
        { code: 'SHT101', name: 'SEGURIDAD E HIGIENE EN EL TRABAJO', credits: 3 },
        { code: 'ASIC101', name: 'APLICACIÓN DE SISTEMAS INTEGRADOS DE CALIDAD', credits: 3 },
        { code: 'EE101', name: 'ELECTIVA III - ÁREA EMPRESARIALES', credits: 3 },
      ],
    },
    {
      number: 'XIII',
      courses: [
        { code: 'PPS101', name: 'PRÁCTICA PROFESIONAL SUPERVISADA', credits: 3 },
      ],
    },
  ];

  return (
    <div className="ciencias-computación-container">
      <div className="header">
        <h1>PLAN DE ESTUDIOS</h1>
        <h2>Ingeniería Industrial</h2>
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

export default IndustrialPensum;