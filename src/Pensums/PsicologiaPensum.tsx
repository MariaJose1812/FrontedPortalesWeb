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

const PsicologiaPensum: React.FC = () => {
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
        { code: 'BG101', name: 'BIOLOGÍA', credits: 4 },
        { code: 'MT101', name: 'MATEMÁTICAS', credits: 4 },
        { code: 'PS101', name: 'INTRODUCCIÓN A LA PSICOLOGÍA', credits: 3 },
        { code: 'FI101', name: 'FILOSOFÍA', credits: 3 },
      ],
    },
    {
      number: 'II',
      courses: [
        { code: 'ES201', name: 'EXPRESIÓN ORAL Y ESCRITA', credits: 3 },
        { code: 'SC101', name: 'SOCIOLOGÍA', credits: 3 },
        { code: 'MT202', name: 'ESTADÍSTICA I', credits: 4 },
        { code: 'PS202', name: 'TEORÍAS DE LA PERSONALIDAD I', credits: 3 },
        { code: 'CR201', name: 'EL HOMBRE FRENTE A LA VIDA', credits: 3 },
      ],
    },
    {
      number: 'III',
      courses: [
        { code: 'PS212', name: 'ENTREVISTA PSICOLÓGICA', credits: 3 },
        { code: 'PS201', name: 'PSICOFISIOLOGÍA I', credits: 4 },
        { code: 'HS101', name: 'HISTORIA DE HONDURAS', credits: 3 },
        { code: 'EL101', name: 'ELECTIVA I', credits: 3 },
        { code: 'CR204', name: 'ÉTICA PROFESIONAL', credits: 3 },
      ],
    },
    {
      number: 'IV',
      courses: [
        { code: 'PS218', name: 'REDACCIÓN PSICOLÓGICA', credits: 3 },
        { code: 'PS301', name: 'PSICOFISIOLOGÍA II', credits: 4 },
        { code: 'AD302', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN', credits: 3 },
        { code: 'PS230', name: 'PSICOLOGÍA DEL DESARROLLO DEL NIÑO', credits: 3 },
        { code: 'PS214', name: 'ÉTICA EN PSICOLOGÍA', credits: 3 },
      ],
    },
    {
      number: 'V',
      courses: [
        { code: 'EL102', name: 'ELECTIVA II', credits: 3 },
        { code: 'PS308', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN PSICOLÓGICA', credits: 4 },
        { code: 'PS240', name: 'PSICOLOGÍA DEL DESARROLLO DEL ADOLESCENTE', credits: 3 },
        { code: 'PS325', name: 'PSICOMETRÍA I', credits: 3 },
        { code: 'PS260', name: 'TEORÍA Y CLÍNICA DE PSICOANÁLISIS', credits: 3 },
      ],
    },
    {
      number: 'VI',
      courses: [
        { code: 'PS315', name: 'PSICOLOGÍA DE LAS ORGANIZACIONES I', credits: 3 },
        { code: 'PS258', name: 'PSICOLOGÍA SOCIAL I', credits: 3 },
        { code: 'PS250', name: 'PSICOLOGÍA DEL DESARROLLO DE LA ADULTEZ Y LA VEJEZ', credits: 3 },
        { code: 'PS335', name: 'PSICOMETRÍA II', credits: 3 },
        { code: 'PS338', name: 'PSICOPATOLOGÍA I', credits: 4 },
      ],
    },
    {
      number: 'VII',
      courses: [
        { code: 'PS270', name: 'TEORÍA E INTERVENCIÓN EN PSICOLOGÍA HUMANÍSTICA', credits: 3 },
        { code: 'PS305', name: 'PSICOLOGÍA SOCIAL II', credits: 3 },
        { code: 'PS321', name: 'PSICOLOGÍA DEL APRENDIZAJE', credits: 3 },
        { code: 'PS345', name: 'PSICOMETRÍA III', credits: 4 },
        { code: 'PS348', name: 'PSICOPATOLOGÍA II', credits: 4 },
      ],
    },
    {
      number: 'VIII',
      courses: [
        { code: 'PS280', name: 'TEORÍA E INTERVENCIÓN EN PSICOLOGÍA COGNITIVA', credits: 4 },
        { code: 'PS370', name: 'PSICOLOGÍA PREVENTIVA Y SALUD PÚBLICA', credits: 4 },
        { code: 'PS351', name: 'PSICOLOGÍA EDUCATIVA', credits: 4 },
        { code: 'PS355', name: 'PSICOMETRÍA IV', credits: 3 },
        { code: 'PS354', name: 'TÉCNICAS PROYECTIVAS I', credits: 4 },
      ],
    },
    {
      number: 'IX',
      courses: [
        { code: 'PS374', name: 'TÉCNICAS TERAPÉUTICAS I', credits: 3 },
        { code: 'PS375', name: 'TEORÍA Y ABORDAJE DE LA INTERVENCIÓN EN CRISIS', credits: 3 },
        { code: 'PS317', name: 'PSICOLOGÍA DE LAS ORGANIZACIONES II', credits: 3 },
        { code: 'PS371', name: 'DIAGNÓSTICO E INTERVENCIÓN PSICOEDUCATIVA', credits: 4 },
        { code: 'PS364', name: 'TÉCNICAS PROYECTIVAS II', credits: 4 },
      ],
    },
    {
      number: 'X',
      courses: [
        { code: 'PS378', name: 'TÉCNICAS TERAPÉUTICAS II', credits: 3 },
        { code: 'PS384', name: 'ORIENTACIÓN Y CONSEJERÍA PSICOLÓGICA', credits: 3 },
        { code: 'PS329', name: 'PSICOLOGÍA DEL TALENTO HUMANO', credits: 4 },
        { code: 'CR501', name: 'DOCTRINA SOCIAL DE LA IGLESIA', credits: 3 },
        { code: 'PS365', name: 'DIAGNÓSTICOS E INFORMES PSICOLÓGICOS', credits: 4 },
      ],
    },
    {
      number: 'XI',
      courses: [
        { code: 'EL103', name: 'ELECTIVA III', credits: 3 },
        { code: 'PS395', name: 'SEMINARIO DE INVESTIGACIÓN EN PSICOLOGÍA APLICADA', credits: 4 },
        { code: 'PS385', name: 'METODOLOGÍA Y MODELOS DE INTERVENCIÓN COMUNITARIA', credits: 4 },
        { code: 'PS381', name: 'ORIENTACIÓN VOCACIONAL Y PROFESIONAL', credits: 4 },
        { code: 'AD104', name: 'GESTIÓN DE LA CALIDAD TOTAL', credits: 3 },
      ],
    },
    {
      number: 'XII',
      courses: [
        { code: 'PS392', name: 'PSICOLOGÍA JURÍDICA', credits: 3 },
        { code: 'PS398', name: 'DISEÑO Y DESARROLLO DE PROYECTOS DE PSICOLOGÍA APLICADA', credits: 4 },
        { code: 'PS390', name: 'SEMINARIO DE SALUD MENTAL EN HONDURAS', credits: 3 },
        { code: 'PS386', name: 'PSICOLOGÍA DEL DEPORTE', credits: 3 },
        { code: 'MT304', name: 'CONTROL ESTADÍSTICO DE LA CALIDAD', credits: 3 },
      ],
    },
    {
      number: 'XIII',
      courses: [
        { code: 'IF400', name: 'PRÁCTICA PROFESIONAL SUPERVISADA', credits: 0 },
        { code: 'AD402', name: 'PLANEACIÓN Y DISEÑO DE UN MODELO DE CALIDAD', credits: 3 },
      ],
    },
  ];

  return (
    <div className="psicologia-container">
      <div className="header">
        <h1>PLAN DE ESTUDIOS</h1>
        <h2>Psicología</h2>
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

export default PsicologiaPensum;