
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Menu, X, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Register from '@/components/Register';
import Feed from '@/components/Feed';
import Events from '@/components/Events';
import Chat from '@/components/Chat';
import Announcements from '@/components/Announcements';
import FAQ from '@/components/FAQ';
import UserProfile from '@/components/UserProfile'; 

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Estudiante Ejemplo',
    career: 'Ing. en Sistemas',
    semester: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1652841190565-b96e0acbae17'
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

  const handleUpdateUser = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <Router>
      <div>
        <motion.nav 
          className="navbar"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container navbar-content">
            <Link to="/" className="logo">EduSocial</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/events" className="nav-link">Eventos</Link>
              <Link to="/chat" className="nav-link">Chat</Link>
              <Link to="/announcements" className="nav-link">Anuncios</Link>
              <Link to="/faq" className="nav-link">FAQ</Link>
              {isAuthenticated ? (
                <Link to="/profile" className="nav-link">
                  <User size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Ver perfil
                </Link>
              ) : (
                <Link to="/register" className="nav-link">
                   <LogIn size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Registro
                </Link>
              )}
              <button onClick={toggleAuth} className="btn btn-secondary btn-sm" style={{marginLeft: '1rem'}}>
                {isAuthenticated ? 'Logout (Test)' : 'Login (Test)'}
              </button>
            </div>
            <button className="mobile-menu-button" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Inicio</Link>
              <Link to="/events" className="nav-link" onClick={toggleMobileMenu}>Eventos</Link>
              <Link to="/chat" className="nav-link" onClick={toggleMobileMenu}>Chat</Link>
              <Link to="/announcements" className="nav-link" onClick={toggleMobileMenu}>Anuncios</Link>
              <Link to="/faq" className="nav-link" onClick={toggleMobileMenu}>FAQ</Link>
              {isAuthenticated ? (
                 <Link to="/profile" className="nav-link" onClick={toggleMobileMenu}>Ver perfil</Link>
              ) : (
                <Link to="/register" className="nav-link" onClick={toggleMobileMenu}>Registro</Link>
              )}
              <button onClick={() => { toggleAuth(); toggleMobileMenu(); }} className="btn btn-secondary btn-sm" style={{marginTop: '1rem', width: 'auto'}}>
                {isAuthenticated ? 'Logout (Test)' : 'Login (Test)'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className={`container main-content ${!isAuthenticated ? 'main-content-unauthenticated' : ''}`}
          initial={{ opacity: 0, y: 20 }} /* Restaurado y: 20 */
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} /* Ajustado delay */
        >
          <Routes>
            <Route path="/" element={<Feed isAuthenticated={isAuthenticated} user={currentUser} onUpdateUser={handleUpdateUser} />} /> 
            <Route path="/register" element={
              <div className="content-full-width">
                <Register isAuthenticated={isAuthenticated} onRegisterSuccess={toggleAuth} />
              </div>
            } /> 
            <Route path="/events" element={<div className="content-full-width"><Events /></div>} />
            <Route path="/chat" element={<div className="content-full-width"><Chat /></div>} />
            <Route path="/announcements" element={<div className="content-full-width"><Announcements /></div>} />
            <Route path="/faq" element={<div className="content-full-width"><FAQ /></div>} />
            <Route path="/profile" element={
              isAuthenticated ? (
                <div className="content-full-width">
                  <UserProfile user={currentUser} onUpdateUser={handleUpdateUser} />
                </div>
              ) : (
                 /* Redirect to register if trying to access profile while not logged in */
                <div className="content-full-width"> <Register isAuthenticated={isAuthenticated} onRegisterSuccess={toggleAuth}/> </div>
              )
            } />
          </Routes>
        </motion.div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
