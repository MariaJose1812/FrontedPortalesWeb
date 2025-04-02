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

const ICienciasComputaciónPensum: React.FC = () => {
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
        { code: 'MT101', name: 'MATEMÁTICAS', credits: 3 },
        { code: 'IF112', name: 'INTRODUCCIÓN A LAS CIENCIAS DE LA COMPUTACIÓN', credits: 3 },
        { code: 'SC101', name: 'SOCIOLOGÍA', credits: 3 },
        { code: 'FI101', name: 'FILOSOFÍA', credits: 3 },
      ],
    },
    {
      number: 'II',
      courses: [
        {
          code: 'ES201',
          name: 'EXPRESIÓN ORAL Y ESCRITA',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'MT201',
          name: 'PRE-CÁLCULO',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF200',
          name: 'FUNDAMENTOS Y LÓGICA DE PROGRAMACIÓN',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'HS101',
          name: 'HISTORIA DE HONDURAS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'CR201',
          name: 'EL HOMBRE FRENTE A LA VIDA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'CSL1-ESPF1',
          name: 'RETIRO DE PADRES DE FAMILIA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'III',
      courses: [
        {
          code: 'MT202',
          name: 'ESTADÍSTICA I',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'MT303',
          name: 'CÁLCULO I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF214',
          name: 'PROGRAMACIÓN ESTRUCTURADA I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF213',
          name: 'ESTRUCTURAS DISCRETAS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'BG2005',
          name: 'Electiva: ECOLOGÍA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'IV',
      courses: [
        {
          code: 'LG240',
          name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'MT401',
          name: 'CÁLCULO II',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF303',
          name: 'PROGRAMACIÓN ESTRUCTURADA II',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'FS301',
          name: 'FÍSICA I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'AD101',
          name: 'ADMINISTRACIÓN I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'V',
      courses: [
        {
          code: 'IF207',
          name: 'BASE DE DATOS I',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'CT201',
          name: 'CONTABILIDAD I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF325',
          name: 'PROGRAMACIÓN EN ENTORNOS DE DESARROLLO VISUAL',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF319',
          name: 'PRINCIPIOS DE ELECTRÓNICA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'MT204',
          name: 'MATEMÁTICA FINANCIERA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'VI',
      courses: [
        {
          code: 'IF327',
          name: 'BASE DE DATOS II',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'IF212',
          name: 'ANÁLISIS Y DISEÑO DE SISTEMAS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF323',
          name: 'REDES I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF324',
          name: 'CIRCUITOS LÓGICOS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'CR204',
          name: 'ÉTICA PROFESIONAL',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'VII',
      courses: [
        {
          code: 'IF342',
          name: 'BASE DE DATOS MULTIDIMENSIONAL',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'IF340',
          name: 'PROGRAMACIÓN MULTIPLATAFORMA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF314',
          name: 'DESARROLLO DE SOFTWARE',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF328',
          name: 'REDES II',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF329',
          name: 'SISTEMAS AUTOMATIZADOS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'VIII',
      courses: [
        {
          code: 'IF211',
          name: 'SISTEMAS INTELIGENTES DE NEGOCIOS',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'IF394',
          name: 'DISEÑO GRÁFICO',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF346',
          name: 'IMPLEMENTACIÓN DE SISTEMAS DE SOFTWARE',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF107',
          name: 'SISTEMAS OPERATIVOS I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF370',
          name: 'MICROCONTROLADORES',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'IX',
      courses: [
        {
          code: 'IF353',
          name: 'DESARROLLO DE PORTALES WEB I',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'IF351',
          name: 'PROGRAMACIÓN MÓVIL I',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'AD104',
          name: 'GESTIÓN DE LA CALIDAD TOTAL',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF209',
          name: 'SISTEMAS OPERATIVOS II',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF381',
          name: 'SEMINARIO DE HARDWARE Y ELECTRICIDAD',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'X',
      courses: [
        {
          code: 'IF357',
          name: 'DESARROLLO DE PORTALES WEB II',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'IF355',
          name: 'PROGRAMACIÓN MÓVIL II',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'MT304',
          name: 'CONTROL ESTADISTÍCO DE LA CALIDAD',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF356',
          name: 'GESTIÓN Y ESTÁNDARES DE TECNOLOGÍA DE LA INFORMACIÓN',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'CR501',
          name: 'DOCTRINA SOCIAL DE LA IGLESIA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'XI',
      courses: [
        {
          code: 'IF412',
          name: 'NEGOCIOS WEB',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'IF409',
          name: 'PROGRAMACIÓN DE NEGOCIOS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'AD402',
          name: 'PLANEACIÓN Y DISEÑO DE UN MODELO DE CALIDAD',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF360',
          name: 'SEGURIDAD INFORMÁTICA Y GESTIÓN DEL RIESGO',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF358',
          name: 'ADMINISTRACIÓN DE CENTROS DE CÓMPUTO',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'XII',
      courses: [
        {
          code: 'IF505',
          name: 'SEMINARIO TALLER DE SOFTWARE',
          credits: 3,
          prerequisite: ''
        },
        {
          code: 'IF392',
          name: 'GESTIÓN DE PROYECTOS INFORMATIVOS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF350',
          name: 'BIG DATA',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF380',
          name: 'AUDITORÍA DE SISTEMAS DE INFORMACIÓN',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
        {
          code: 'IF393',
          name: 'EXCELL PARA INGENIERÍAS',
          credits: 3,
          prerequisite: '',
          requiredFor: ''
        },
      ]
    },
    {
      number: 'XIII',
      courses: [
        {
          code: '',
          name: 'PRÁCTICA PROFESIONAL SUPERVISADA',
          credits: 3,
          prerequisite: ''
        }
      ]
    },

  ];

  return (
    <div className="ciencias-computación-container">
      <div className="header">
        <h1>PLAN DE ESTUDIOS</h1>
        <h2>Ingeniería en Ciencias de la Computación</h2>
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
    <hr />
    <p><strong>REQUISITO</strong></p>
    <p>{selectedCourse?.prerequisite || 'Ninguno'}</p>
    <hr />
    <p><strong>ES REQUISITO DE</strong></p>
    <p>{selectedCourse?.requiredFor || 'Ninguno'}</p>
    <hr />
    {selectedCourse && (
      <div>
        <label>
          <input
            type="checkbox"
            checked={approvedCourses.has(selectedCourse.code)}
            onChange={() => togglePending(selectedCourse)}
            disabled={loading || loadingCourseCode === selectedCourse.code}
            className="custom-checkbox" // Aplica la clase personalizada aquí
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

export default ICienciasComputaciónPensum;
