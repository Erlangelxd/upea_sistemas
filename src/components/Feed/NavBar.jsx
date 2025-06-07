import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ isAuthenticated, toggleAuth, isMobileMenuOpen, toggleMobileMenu }) {
  return (
    <>
      <motion.nav className="navbar" initial={{ y: -100 }} animate={{ y: 0 }}>
        <div className="container navbar-content">
          <Link to="/" className="logo">
            IngeniaRed
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/events" className="nav-link">Eventos</Link>
            <Link to="/announcements" className="nav-link">Anuncios</Link>
            <Link to="/faq" className="nav-link">FAQ</Link>
            <Link to="/panel_admin" className="nav-link">Panel_admin</Link>
            
            {isAuthenticated ? (
              <Link to="/profile" className="nav-link">
                <User size={18} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                Ver perfil
              </Link>
            ) : (
              <Link to="/register" className="nav-link">
                <LogIn size={18} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                Registro
              </Link>
            )}

            <button
              onClick={toggleAuth}
              className="btn btn-secondary btn-sm"
              style={{ marginLeft: "1rem" }}
            >
              {isAuthenticated ? "Logout (Test)" : "Login (Test)"}
            </button>
          </div>

          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Inicio</Link>
            <Link to="/events" className="nav-link" onClick={toggleMobileMenu}>Eventos</Link>
            <Link to="/announcements" className="nav-link" onClick={toggleMobileMenu}>Anuncios</Link>
            <Link to="/faq" className="nav-link" onClick={toggleMobileMenu}>FAQ</Link>
            {isAuthenticated ? (
              <Link to="/profile" className="nav-link" onClick={toggleMobileMenu}>Ver perfil</Link>
            ) : (
              <Link to="/register" className="nav-link" onClick={toggleMobileMenu}>Registro</Link>
            )}
            <Link to="/admin" className="nav-link">Admin</Link>
            <button
              onClick={() => {
                toggleAuth();
                toggleMobileMenu();
              }}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: "1rem", width: "auto" }}
            >
              {isAuthenticated ? "Logout (Test)" : "Login (Test)"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
