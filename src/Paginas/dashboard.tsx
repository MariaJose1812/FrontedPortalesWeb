import "bootstrap/dist/css/bootstrap.min.css";
import { FaChalkboardTeacher, FaBook, FaQrcode, FaDesktop, FaChalkboard, FaVideo } from "react-icons/fa";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [facultadId, setFacultadId] = useState<string>("");
  const [facultadLabel, setFacultadLabel] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem('userId') || '';
  const RoleId = localStorage.getItem('RoleId');  

  const facultades: { [key: string]: string } = {
    "CE02002": "Mercadotecnia",
    "CE03100": "Gestión Estratégica de Empresas",
    "COP": "Coprogramáticas",
    "CRO1001": "Clases Sello",
    "EF010": "Enfermería",
    "EG01001": "Estudios Generales",
    "IDINO1001": "Diplomado Inglés",
    "IF01002": "Ingeniería en Ciencias de la Computación",
    "IG02002": "Ingeniería Industrial",
    "IG04001": "Ingeniería Civil",
    "LG01002": "Derecho",
    "MD01102": "Doctor en Medicina y Cirugía",
    "PS01001": "Psicología"
  };

  useEffect(() => {
    if (RoleId === '1') {
      setLoading(false);
      setUser({ nombre: 'Admin' });
      return;
    }
  
    const fetchAlumnoData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/alumno/getAlumno`);
        const alumno = response.data.result.find((alumno: any) => alumno.alumnoId === userId);
  
        if (alumno) {
          const id = alumno.facultadId;
          const nombreFacultad = facultades[id] || "Facultad no encontrada";
  
          setUser(alumno);
          setFacultadId(id); 
          setFacultadLabel(nombreFacultad); 
        } else {
          setError('Alumno no encontrado');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAlumnoData();
  }, [userId, RoleId]);
  


  const handleServiciosAcademicosClick = () => {
    if (facultadId === 'IF01002') {
      navigate('/ICienciasComputacionPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    } else if (facultadId === 'IG02002') {
      navigate('/IndustrialPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    } else if (facultadId === 'IG04001') {
      navigate('/CivilPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    }else if (facultadId === 'LG01002') {
      navigate('/DerechoPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    }else if (facultadId === 'CE03100') {
      navigate('/EmpresasPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    }else if (facultadId === 'MD01102') {
      navigate('/MedicinaCirugiaPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    }else if (facultadId === 'CE02002') {
      navigate('/MercadotecniaPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    }else if (facultadId === 'PS01001') {
      navigate('/PsicologiaPensum', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    } 
  };

  const handleRegistroMatriculaClick = () => {
    if (RoleId === '1') {
      navigate('/aprobadas', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    } else {
      navigate('/AprobadasAlumno', { state: { dni: user?.alumnoId, nombre: user?.nombre } });
    }
  };

  if (loading) return <div className="loading-spinner">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      

      <main className="dashboard-main">
        <div className="container-fluid">
          <div className="welcome-section">
            <h1 className="welcome-title">Bienvenido, {RoleId === '1' ? userId : user?.nombre || 'Estudiante'}</h1>
            <p className="welcome-subtitle">Selecciona el servicio que necesitas</p>
            
            {user && RoleId !== '1' && (
              <div className="user-badge">
                <span className="badge-item">ID: {user.alumnoId}</span>
                <span className="badge-item">Facultad: {facultadLabel}</span>
              </div>
            )}
          </div>

          <div className="services-row">
            <ServiceCard 
              icon={<FaVideo />} 
              title="Aula Virtual" 
              color="blue" 
              to="#" 
            />
            <ServiceCard 
              icon={<FaBook />} 
              title="Bibliotecas" 
              color="blue" 
              to="#" 
            />
            <ServiceCard 
              icon={<FaDesktop />} 
              title="Registro Matrícula" 
              color="green" 
              onClick={handleRegistroMatriculaClick} 
            />
          </div>

          <div className="services-row">
            {RoleId !== '1' && (
              <ServiceCard 
                icon={<FaQrcode />} 
                title="Servicios Académicos" 
                color="blue" 
                onClick={handleServiciosAcademicosClick}
              />
            )}
            <ServiceCard 
              icon={<FaChalkboardTeacher />} 
              title="Moodle 2024" 
              color="blue" 
              to="#" 
            />
            <ServiceCard 
              icon={<FaChalkboard />} 
              title="Moodle ICB" 
              color="blue" 
              to="#" 
            />
          </div>
        </div>
      </main>


    </div>
  );
}

function ServiceCard({ icon, title, color, to, onClick }: {
  icon: React.ReactNode;
  title: string;
  color: 'blue' | 'green';
  to?: string;
  onClick?: () => void;
}) {
  return to ? (
    <Link to={to} className={`service-card ${color}-card`}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
    </Link>
  ) : (
    <button className={`service-card ${color}-card`} onClick={onClick}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
    </button>
  );
}

export default Dashboard;
