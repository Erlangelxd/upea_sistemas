import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "./components/Feed/NavBar";

import Register from "./pages/Register";
import RegisterAdmin from "./pages/Register_admin";
import UserProfile from "./pages/UserProfile";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Estudiante Ejemplo",
    career: "Ing. en Sistemas",
    semester: 4,
    avatarUrl:
      "https://w7.pngwing.com/pngs/128/223/png-transparent-user-person-profile-instagram-ui-colored-icon.png",
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleAuth = () => setIsAuthenticated((prev) => !prev);
  const handleUpdateUser = (updatedData) =>
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        toggleAuth={toggleAuth}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <motion.div
        className={`container main-content ${!isAuthenticated ? "main-content-unauthenticated" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                user={currentUser}
                onUpdateUser={handleUpdateUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                isAuthenticated={isAuthenticated}
                onRegisterSuccess={toggleAuth}
              />
            }
          />
          <Route
            path="/register_admin"
            element={
              <RegisterAdmin
                isAuthenticated={isAuthenticated}
                onRegisterSuccess={toggleAuth}
              />
            }
          />
          <Route path="/events" element={<Events />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <UserProfile
                  user={currentUser}
                  onUpdateUser={handleUpdateUser}
                />
              ) : (
                <Register
                  isAuthenticated={isAuthenticated}
                  onRegisterSuccess={toggleAuth}
                />
              )
            }
          />
        </Routes>
      </motion.div>

      <Toaster />
    </Router>
  );
}

export default App;
