import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import Logo from "../../images/logo2.png";

const Header = ({ user_id, test, rol, pageTitle}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="header">
      <nav>
        {test ? (
          <>
          <div className="logo">
            <img src={Logo} alt="MedicCare" />
            <h1>{pageTitle}</h1>
        </div>
            
            <h6>Bienvenido {test[0].nombre}</h6>
          </>
        ) : (
            <div className="logo">
            <img src={Logo} alt="MedicCare" />
            <h1>{pageTitle}</h1>
        </div>
        )}
        <Link to={{ pathname: "/home", search: createSearchParams({ id: user_id }).toString() }}>Home</Link>
        <Link to={{ pathname: "/registro_paciente", search: createSearchParams({ id: user_id }).toString() }}>Registro de paciente</Link>
        <Link to={{ pathname: "/ingreso_paciente", search: createSearchParams({ id: user_id }).toString() }}>Ingreso de paciente</Link>
        <Link to={{ pathname: "/inventario", search: createSearchParams({ id: user_id }).toString() }}>Inventario</Link>
        <Link to={{ pathname: "/act_datos", search: createSearchParams({ id: user_id }).toString() }}>Act. de datos</Link>
        {test && rol && (
          <>
            <Link to={{ pathname: "/registro", search: createSearchParams({ id: user_id }).toString() }}>Registro de médicos</Link>
            <Link to={{ pathname: "/reportes", search: createSearchParams({ id: user_id }).toString() }}>Reportes</Link>
            <Link to={{ pathname: "/logs", search: createSearchParams({ id: user_id }).toString() }}>Logs</Link>
          </>
        )}
        <Link to="/" className="logout">Logout</Link>
        <div className={`shadow ${isMobileNavOpen ? "active" : ""}`} />
        <div className={`hamburger ${isMobileNavOpen ? "active" : ""}`} onClick={handleMobileNavClick}>
            <span />
          <span />
          <span />
        </div>
        <nav className={`mobile-nav ${isMobileNavOpen ? "active" : ""}`} style={{ right: isMobileNavOpen ? "0" : "-280px" }}>
          <Link to={{ pathname: "/home", search: createSearchParams({ id: user_id }).toString() }}>Home</Link>
          <Link to={{ pathname: "/registro_paciente", search: createSearchParams({ id: user_id }).toString() }}>Registro de paciente</Link>
          <Link to={{ pathname: "/ingreso_paciente", search: createSearchParams({ id: user_id }).toString() }}>Ingreso de paciente</Link>
          <Link to={{ pathname: "/inventario", search: createSearchParams({ id: user_id }).toString() }}>Inventario</Link>
          <Link to={{ pathname: "/act_datos", search: createSearchParams({ id: user_id }).toString() }}>Act. de datos</Link>
          {test && rol && (
            <>
              <Link to={{ pathname: "/registro", search: createSearchParams({ id: user_id }).toString() }}>Registro de médicos</Link>
              <Link to={{ pathname: "/reportes", search: createSearchParams({ id: user_id }).toString() }}>Reportes</Link>
              <Link to={{ pathname: "/logs", search: createSearchParams
              ({ id: user_id }).toString() }}>Logs</Link>
              </>
            )}
            <Link to="/" className="logout">Logout</Link>
        </nav>
        </nav>
        </div>
      );
    };
    
    export default Header;
    
