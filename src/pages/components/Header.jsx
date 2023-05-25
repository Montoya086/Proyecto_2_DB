import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createSearchParams } from "react-router-dom";

const Header = ({ user_id, test, rol }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="header">
      <nav>
        {test ? (
          <>
            <h1>Página principal</h1>
            <h6>Bienvenido {test[0].nombre}</h6>
          </>
        ) : (
          <h1>Ingreso de paciente</h1>
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
          <div className="line"/>
          <div className="line"/>
          <div className="line"/>
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
    
