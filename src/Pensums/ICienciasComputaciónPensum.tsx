import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ICienciasComputaciónPensum.css';

interface Course {
  code: string;
  name: string;
}

interface Semester {
  number: string;
  courses: Course[];
}

const ICienciasComputaciónPensum: React.FC = () => {
  // Datos de los semestres y cursos
  const semesters: Semester[] = [
    {
      number: 'I',
      courses: [
        { code: 'Créditos: 3', name: 'ESPAÑOL' },
        { code: 'Créditos: 4', name: 'MATEMÁTICAS' },
        { code: 'Créditos: 3', name: 'INTRODUCCIÓN A LAS CIENCIAS DE LA COMPUTACIÓN' },
        { code: 'Créditos: 3', name: 'SOCIOLOGÍA' },
        { code: 'Créditos: 3', name: 'FILOSOFÍA' }
      ]
    },
    {
      number: 'II',
      courses: [
        { code: 'Créditos: 3', name: 'EXPRESIÓN ORAL Y ESCRITA' },
        { code: 'Créditos: 4', name: 'PRE-CÁLCULO' },
        { code: 'Créditos: 4', name: 'FUNDAMENTOS Y LÓGICA DE PROGRAMACIÓN' },
        { code: 'Créditos: 3', name: 'HISTORIA DE HONDURAS' },
        { code: 'Créditos: 3', name: 'EL HOMBRE FRENTE A LA VIDA' },
        { code: 'CSL1-ESPF1', name: 'RETIRO DE PADRES DE FAMILIA' }
      ]
    },
    {
      number: 'III',
      courses: [
        { code: 'Créditos: 4', name: 'ESTADÍSTICA I' },
        { code: 'Créditos: 4', name: 'CÁLCULO I' },
        { code: 'Créditos: 3', name: 'PROGRAMACIÓN ESTRUCTURADA I' },
        { code: 'Créditos: 3', name: 'ESTRUCTURAS DISCRETAS' },
        { code: 'Créditos: 3', name: 'Electiva: ECOLOGÍA' }
      ]
    },
    {
      number: 'IV',
      courses: [
        { code: 'Créditos: 3', name: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN' },
        { code: 'Créditos: 4', name: 'CÁLCULO II' },
        { code: 'Créditos: 3', name: 'PROGRAMACIÓN ESTRUCTURADA II' },
        { code: 'Créditos: 3', name: 'FÍSICA I' },
        { code: 'Créditos: 3', name: 'ADMINISTRACIÓN I' }
      ]
    },
    {
      number: 'V',
      courses: [
        { code: 'Créditos: 3', name: 'BASE DE DATOS I' },
        { code: 'Créditos: 3', name: 'CONTABILIDAD' },
        { code: 'Créditos: 3', name: 'PROGRAMACIÓN EN ENTORNOS DE DESARROLLO VISUAL' },
        { code: 'Créditos: 3', name: 'PRINCIPIOS DE ELECTRÓNICA' },
        { code: 'Créditos: 3', name: 'MATEMÁTICA FINANCIERA' }
      ]
    },

    {
      number: 'VI',
      courses: [
        { code: 'Créditos: 3', name: 'BASE DE DATOS II' },
        { code: 'Créditos: 3', name: 'ANÁLISIS Y DISEÑO DE SISTEMAS' },
        { code: 'Créditos: 4', name: 'REDES I' },
        { code: 'Créditos: 3', name: 'CIRCUITOS LÓGICOS' },
        { code: 'Créditos: 3', name: 'ÉTICA PROFESIONAL' }
      ]
    },
    {
      number: 'VII',
      courses: [
        { code: 'Créditos: 3', name: 'BASE DE DATOS MULTIDIMENSIONAL' },
        { code: 'Créditos: 3', name: 'PROGRAMACIÓN MULTIPLATAFORMA' },
        { code: 'Créditos: 4', name: 'DESARROLLO DE SOFTWARE' },
        { code: 'Créditos: 4', name: 'REDES II' },
        { code: 'Créditos: 3', name: 'SISTEMAS AUTOMATIZADOS' }
      ]
    },
    {
      number: 'VIII',
      courses: [
        { code: 'Créditos: 3', name: 'SISTEMAS INTELIGENTES DE NEGOCIOS' },
        { code: 'Créditos: 3', name: 'DISEÑO GRÁFICO' },
        { code: 'Créditos: 3', name: 'IMPLEMENTACIÓN DE SISTEMAS DE SOFTWARE' },
        { code: 'Créditos: 3', name: 'SISTEMAS OPERATIVOS I' },
        { code: 'Créditos: 3', name: 'MICROCONTROLADORES' }
      ]
    },

    {
      number: 'IX',
      courses: [
        { code: 'Créditos: 3', name: 'DESARROLLO DE PORTALES WEB I' },
        { code: 'Créditos: 3', name: 'PROGRAMACIÓN MÓVIL I' },
        { code: 'Créditos: 3', name: 'GESTIÓN DE LA CALIDAD TOTAL' },
        { code: 'Créditos: 3', name: 'SISTEMAS OPERATIVOS II' },
        { code: 'Créditos: 3', name: 'SEMINARIO DE HARDWARE Y ELECTRICIDAD' }
      ]
    },
    {
      number: 'X',
      courses: [
        { code: 'Créditos: 3', name: 'DESARROLLO DE PORTALES WEB II' },
        { code: 'Créditos: 3', name: 'PROGRAMACIÓN MÓVIL II' },
        { code: 'Créditos: 3', name: 'CONTROL ESTADISTÍCO DE LA CALIDAD' },
        { code: 'Créditos: 3', name: 'GESTIÓN Y ESTÁNDARES DE TECNOLOGÍA DE LA INFORMACIÓN' },
        { code: 'Créditos: 3', name: 'DOCTRINA SOCIAL DE LA IGLESIA' }
      ]
    },

    {
      number: 'XI',
      courses: [
        { code: 'Créditos: 3', name: 'NEGOCIOS WEB' },
        { code: 'Créditos: 3', name: 'PROGRAMACIÓN DE NEGOCIOS' },
        { code: 'Créditos: 3', name: 'PLANEACIÓN Y DISEÑO DE UN MODELO DE CALIDAD' },
        { code: 'Créditos: 3', name: 'SEGURIDAD INFORMÁTICA Y GESTIÓN DEL RIESGO' },
        { code: 'Créditos: 3', name: 'ADMINISTRACIÓN DE CENTROS DE CÓMPUTO' }
      ]
    },
    {
      number: 'XII',
      courses: [
        { code: 'Créditos: 3', name: 'SEMINARIO TALLER DE SOFTWARE' },
        { code: 'Créditos: 3', name: 'GESTIÓN DE PROYECTOS INFORMATIVOS' },
        { code: 'Créditos: 3', name: 'BIG DATA' },
        { code: 'Créditos: 3', name: 'AUDITORÍA DE SISTEMAS DE INFORMACIÓN' },
        { code: 'Créditos: 3', name: 'EXCELL PARA INGENIERÍAS' }
      ]
    },

    {
      number: 'XIII',
      courses: [
        { code: ' ', name: 'PRÁCTICA PROFESIONAL SUPERVISADA' }
      ]
    }
  ];

  return (
    <div className="ciencias-computación-container">
      <div className="header">
        <h1>Plan de Estudios</h1>
        <h2>Ingeniería en Ciencias de la Computación</h2>
      </div>

      <div className="container">
        {semesters.map((semester, index) => (
          <div key={index} className="period">
            <div className="period-number">{semester.number}</div>
            <div className="cards">
              {semester.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="card">
                  <div className="card-title">{course.code}</div>
                  <div className="card-name">{course.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ICienciasComputaciónPensum;