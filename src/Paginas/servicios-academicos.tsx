import "bootstrap/dist/css/bootstrap.min.css";
import "./servicios-academicos.css";

const periods = [
  {
    number: "I",
    subjects: [
      { code: "IF2", name: "Clase 1" },
      { code: "IF3", name: "Clase 2" },
      { code: "IF4", name: "Clase 3" },
      { code: "IF5", name: "Clase 4" },
      { code: "IF6", name: "Clase 5" },
    ],
  },
  {
    number: "II",
    subjects: [
      { code: "IF7", name: "Clase 6" },
      { code: "IF8", name: "Clase 7" },
      { code: "IF9", name: "Clase 8" },
      { code: "IF10", name: "Clase 9" },
      { code: "IF11", name: "Clase 10" },
    ],
  },
  {
    number: "III",
    subjects: [
      { code: "IF12", name: "Clase 11" },
      { code: "IF13", name: "Clase 12" },
      { code: "IF14", name: "Clase 13" },
      { code: "IF15", name: "Clase 14" },
      { code: "IF16", name: "Clase 15" },
    ],
  },
  {
    number: "IV",
    subjects: [
      { code: "IF17", name: "Clase 16" },
      { code: "IF18", name: "Clase 17" },
      { code: "IF19", name: "Clase 18" },
      { code: "IF20", name: "Clase 19" },
      { code: "IF21", name: "Clase 20" },
    ],
  },
  {
    number: "V",
    subjects: [
      { code: "IF22", name: "Clase 21" },
      { code: "IF23", name: "Clase 22" },
      { code: "IF24", name: "Clase 23" },
      { code: "IF25", name: "Clase 24" },
      { code: "IF26", name: "Clase 25" },
    ],
  },
];

function ServiciosAcademicos() {
  return (
    <div className="container text-center py-5">
      <div className="header">
        <h1>Plan de Estudios</h1>
        <h2>Ingeniería en Ciencias de la Computación</h2>
      </div>
      <div className="container">
        {periods.map((period) => (
          <div key={period.number} className="period">
            <div className="period-number">{period.number}</div>
            <div className="cards">
              {period.subjects.map((subject) => (
                <div key={subject.code} className="card">
                  <div className="card-title">{subject.code}</div>
                  <div className="card-name">{subject.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiciosAcademicos;