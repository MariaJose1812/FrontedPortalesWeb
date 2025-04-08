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

const MedicinaCirugiaPensum: React.FC = () => {
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
        { code: 'MT101', name: 'MATEMÁTICAS', credits: 4 },
        { code: 'BG101', name: 'BIOLOGÍA', credits: 4 },
        { code: 'QM101', name: 'QUÍMICA I', credits: 5 },
        { code: 'FI101', name: 'FILOSOFÍA', credits: 3 },
      ],
    },
    {
      number: 'II',
      courses: [
        { code: 'ES201', name: 'EXPRESIÓN ORAL Y ESCRITA', credits: 3 },
        { code: 'FS202', name: 'FÍSICA MÉDICA', credits: 3 },
        { code: 'HS101', name: 'HISTORIA DE HONDURAS', credits: 3 },
        { code: 'QM206', name: 'QUÍMICA ORGÁNICA', credits: 3 },
        { code: 'CR201', name: 'EL HOMBRE FRENTE A LA VIDA', credits: 3 },
      ],
    },
    {
      number: 'III',
      courses: [
        { code: 'CR203', name: 'ÉTICA MÉDICA', credits: 3 },
        { code: 'MD202', name: 'BIOESTADÍSTICA', credits: 3 },
        { code: 'HS104', name: 'HISTORIA DE LA MEDICINA', credits: 3 },
        { code: 'QM301', name: 'BIOQUÍMICA', credits: 4 },
        { code: 'SC101', name: 'SOCIOLOGÍA', credits: 3 },
      ],
    },
    {
      number: 'IV',
      courses: [
        { code: 'AD302', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN', credits: 3 },
        { code: 'EL101', name: 'ELECTIVA I', credits: 3 },
        { code: 'BG206', name: 'EMBRIOLOGÍA', credits: 3 },
        { code: 'MD409', name: 'ANATOMÍA I', credits: 4 },
        { code: 'PS104', name: 'PSICOLOGÍA MÉDICA', credits: 3 },
      ],
    },
    {
      number: 'V',
      courses: [
        { code: 'AD104', name: 'GESTIÓN DE LA CALIDAD TOTAL', credits: 3 },
        { code: 'MD304', name: 'HISTOLOGÍA', credits: 3 },
        { code: 'MD409', name: 'ANATOMÍA I', credits: 4 },
        { code: 'MD411', name: 'NEUROANATOMÍA I', credits: 4 },
        { code: 'EL102', name: 'ELECTIVA II', credits: 3 },
      ],
    },
    {
      number: 'VI',
      courses: [
        { code: 'MT304', name: 'CONTROL ESTADÍSTICO DE LA CALIDAD', credits: 3 },
        { code: 'MD410', name: 'ANATOMÍA II', credits: 4 },
        { code: 'MD406', name: 'INMUNOLOGÍA', credits: 4 },
        { code: 'MD412', name: 'NEUROANATOMÍA II', credits: 4 },
        { code: 'MD305', name: 'INTRODUCCIÓN A LA SALUD PÚBLICA', credits: 3 },
      ],
    },
    {
      number: 'VII',
      courses: [
        { code: 'AD402', name: 'PLANEACIÓN Y DISEÑO DE UN MODELO DE CALIDAD', credits: 3 },
        { code: 'MD511', name: 'FISIOLOGÍA I', credits: 4 },
        { code: 'BG404', name: 'MICROBIOLOGÍA', credits: 4 },
        { code: 'MD405', name: 'PARASITOLOGÍA MÉDICA', credits: 3 },
        { code: 'MD306', name: 'EPIDEMIOLOGÍA', credits: 4 },
      ],
    },
    {
      number: 'VIII',
      courses: [
        { code: 'MD407', name: 'MEDICINA BASADA EN EVIDENCIA', credits: 3 },
        { code: 'MD512', name: 'FISIOLOGÍA II', credits: 4 },
        { code: 'EL103', name: 'ELECTIVA III', credits: 3 },
        { code: 'CR501', name: 'DOCTRINA SOCIAL DE LA IGLESIA', credits: 3 },
        { code: 'MD205', name: 'PSICOPATOLOGÍA', credits: 3 },
      ],
    },
    {
      number: 'IX',
      courses: [
        { code: 'MD610', name: 'FISIOPATOLOGÍA I', credits: 4 },
        { code: 'FM601', name: 'FARMACOLOGÍA I', credits: 4 },
        { code: 'MD607', name: 'PATOLOGÍA GENERAL', credits: 4 },
        { code: 'CR301', name: 'BIOÉTICA', credits: 3 },
        { code: 'MD408', name: 'PREVENCIÓN EN SALUD', credits: 4 },
      ],
    },
    {
      number: 'X',
      courses: [
        { code: 'MD611', name: 'FISIOPATOLOGÍA II', credits: 4 },
        { code: 'FM602', name: 'FARMACOLOGÍA II', credits: 4 },
        { code: 'MD608', name: 'PATOLOGÍA SISTÉMICA', credits: 3 },
        { code: 'MD504', name: 'ADMINISTRACIÓN DE SERVICIOS DE SALUD', credits: 3 },
      ],
    },
    {
      number: 'XI',
      courses: [
        { code: 'MD701', name: 'RADIOLOGÍA E IMAGENOLOGÍA', credits: 3 },
        { code: 'MD735', name: 'SEMIOLOGÍA II', credits: 3 },
        { code: 'MD609', name: 'PATOLOGÍA CLÍNICA', credits: 3 },
        { code: 'MD721', name: 'MEDICINA LEGAL Y PATOLOGÍA FORENSE', credits: 4 },
      ],
    },
    {
      number: 'XII',
      courses: [
        { code: 'MD716', name: 'TERAPÉUTICA FARMACOLÓGICA', credits: 3 },
        { code: 'MD735', name: 'SEMIOLOGÍA II', credits: 3 },
        { code: 'MD505', name: 'REHABILITACIÓN FÍSICA', credits: 3 },
        { code: 'MD307', name: 'PSIQUIATRÍA', credits: 3 },
      ],
    },
    {
      number: 'XIII',
      courses: [
        { code: 'MD724', name: 'TERAPÉUTICA ALTERNATIVA', credits: 3 },
        { code: 'MD704', name: 'GINECOLOGÍA Y OBSTETRICIA I', credits: 4 },
        { code: 'MD706', name: 'MEDICINA PEDIÁTRICA I', credits: 4 },
        { code: 'MD705', name: 'MEDICINA DEL ADULTO I', credits: 4 },
      ],
    },
    {
      number: 'XIV',
      courses: [
        { code: 'MD707', name: 'CIRUGÍA I', credits: 4 },
        { code: 'MD708', name: 'GINECOLOGÍA Y OBSTETRICIA II', credits: 4 },
        { code: 'MD709', name: 'MEDICINA DEL ADULTO II', credits: 4 },
      ],
    },
    {
      number: 'XV',
      courses: [
        { code: 'MD711', name: 'CIRUGÍA II', credits: 4 },
        { code: 'MD712', name: 'GINECOLOGÍA Y OBSTETRICIA III', credits: 4 },
        { code: 'MD710', name: 'MEDICINA PEDIÁTRICA II', credits: 4 },
      ],
    },
    {
      number: 'XVI',
      courses: [
        { code: 'MD715', name: 'CIRUGÍA III', credits: 4 },
        { code: 'MD714', name: 'MEDICINA PEDIÁTRICA III', credits: 4 },
        { code: 'MD713', name: 'MEDICINA DEL ADULTO III', credits: 4 },
        { code: 'MD801', name: 'SERVICIO COMUNITARIO', credits: 3 },
      ],
    },
    {
      number: 'XVII',
      courses: [
        { code: 'MD727', name: 'OTORRINOLARINGOLOGÍA', credits: 3 },
        { code: 'MD726', name: 'ORTOPEDIA Y TRAUMATOLOGÍA', credits: 3 },
        { code: 'MD725', name: 'UROLOGÍA', credits: 3 },
        { code: 'MD719', name: 'OFTALMOLOGÍA', credits: 3 },
      ],
    },
    {
      number: 'XVIII',
      courses: [
        { code: 'MD718', name: 'GERIATRÍA', credits: 3 },
        { code: 'MD717', name: 'MEDICINA FETAL', credits: 3 },
        { code: 'MD720', name: 'NEONATOLOGÍA', credits: 3 },
        { code: 'MD728', name: 'DERMATOLOGÍA', credits: 3 },
        { code: 'MD729', name: 'NEUROLOGÍA', credits: 3 },
      ],
    },
    {
      number: 'SÉPTIMO AÑO',
      courses: [
        { code: 'MD805', name: 'INTERNADO DE CIRUGÍA', credits: 12 },
        { code: 'MD802', name: 'INTERNADO DE GINECOBSTETRICIA', credits: 12 },
        { code: 'MD804', name: 'INTERNADO DE PEDIATRÍA', credits: 12 },
        { code: 'MD803', name: 'INTERNADO MEDICINA INTERNA', credits: 12 },
      ],
    },
    {
      number: 'OCTAVO AÑO',
      courses: [
        { code: 'MD900', name: 'SERVICIO SOCIAL', credits: 0 },
      ],
    },
  ];

  return (
    <div className="MedicinaCirugia-container">
      <div className="header">
        <h1>PLAN DE ESTUDIOS</h1>
        <h2>Medicina y Cirugía</h2>
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

export default MedicinaCirugiaPensum;