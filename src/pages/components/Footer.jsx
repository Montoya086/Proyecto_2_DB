import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer_title">Medic Care</p>
      <p className="footer_rights">Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
