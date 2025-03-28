import "bootstrap/dist/css/bootstrap.min.css";
import './dashboard.css'; 

function Dashboard() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="logo.png" alt="Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#">Inicio</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Perfil</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Carnet</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Cerrar sesión</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <main className="container text-center py-5">
        <h1 className="text-primary">Bienvenido</h1>
        <p>Seleccione el sistema al que desea acceder.</p>
        
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card btn-blue p-3">
              <i className="fas fa-video fa-3x"></i>
              <span>Aula Virtual</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card btn-blue p-3">
              <i className="fas fa-book fa-3x"></i>
              <span>Bibliotecas</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card btn-green p-3">
              <i className="fas fa-qrcode fa-3x"></i>
              <span>Registro 2025 <br /> Matrícula</span>
            </div>
          </div>
          <div className="col-md-4">
            <a href="servicios-academicos.html">
              <div className="card btn-blue p-3">
                <i className="fas fa-desktop fa-3x"></i>
                <span>Servicios Académicos</span>
              </div>
            </a>
          </div>
          <div className="col-md-4">
            <div className="card btn-blue p-3">
              <i className="fas fa-chalkboard-teacher fa-3x"></i>
              <span>Moodle 2024 (Nuevo)</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card btn-blue p-3">
              <i className="fas fa-chalkboard fa-3x"></i>
              <span>Moodle ICB</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
