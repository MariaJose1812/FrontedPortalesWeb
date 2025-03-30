import "bootstrap/dist/css/bootstrap.min.css";
import "./servicios-academicos.css";

const subjects = [
  { type: "IF", code: "IF2" },
  { type: "IF", code: "IF3" },
  { type: "IF", code: "IF4" },
  { type: "IF", code: "IF5" },
  { type: "Case", code: "Case 1" },
  { type: "Case", code: "Case 2" },
  { type: "Case", code: "Case 3" },
  { type: "Case", code: "Case 4" },
  { type: "IF", code: "IF6" },
  { type: "Case", code: "Case 5" },
  { type: "IF", code: "IF7" },
  { type: "IF", code: "IF8" },
  { type: "IF", code: "IF9" },
  { type: "IF", code: "IF10" },
  { type: "Case", code: "Case 6" },
  { type: "Case", code: "Case 7" },
  { type: "Case", code: "Case 8" },
  { type: "Case", code: "Case 9" },
  { type: "IF", code: "IF11" }
];

function ServiciosAcademicos() {
  return (
    <div className="plan-container">
      <div className="plan-header">
        <h1>Plan de Estudios</h1>
        <h2>Ingeniería en Ciencias de la Computación</h2>
      </div>
      
      <div className="subjects-list">
        {subjects.map((subject, index) => (
          <div key={index} className={`subject-item ${subject.type.toLowerCase()}`}>
            {subject.code}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiciosAcademicos;