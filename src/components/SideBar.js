import React from "react";
import { Nav } from "react-bootstrap";
import "../style/board.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h4 className="sidebar-title">Tableau de bord</h4>
      <Nav className="flex-column">
        <Nav.Link href="#" className="sidebar-link">
          Accueil
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-link">
          Activité
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-link">
          Localisation
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-link">
          Paramètres
        </Nav.Link>
      </Nav>
    </aside>
  );
};

export default Sidebar;
