import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";

import Navbar from "./components/Feed/NavBar";

//import Feed from "./pages/Feed";
import Register from "./pages/Register";
import Register_admin from "./pages/Register_admin";
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
    semester: 5,
    avatarUrl:
      "https://w7.pngwing.com/pngs/128/223/png-transparent-user-person-profile-instagram-ui-colored-icon.png",
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);
  const handleUpdateUser = (updatedData) =>
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
  
  return (
    <Router>
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          toggleAuth={toggleAuth}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <motion.div
          className={`container main-content ${
            !isAuthenticated ? "main-content-unauthenticated" : ""
          }`}
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
                <div className="content-full-width">
                  <Register
                    isAuthenticated={isAuthenticated}
                    onRegisterSuccess={toggleAuth}
                  />
                </div>
              }
            />
            <Route
              path="/events"
              element={
                <div className="content-full-width">
                  <Events />
                </div>
              }
            />
            <Route
              path="/chat"
              element={
                <div className="content-full-width">
                  <Chat />
                </div>
              }
            />
            <Route
              path="/announcements"
              element={
                <div className="content-full-width">
                  <Announcements />
                </div>
              }
            />
            <Route
              path="/faq"
              element={
                <div className="content-full-width">
                  <FAQ />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <div className="content-full-width">
                    <UserProfile
                      user={currentUser}
                      onUpdateUser={handleUpdateUser}
                    />
                  </div>
                ) : (
                  <div className="content-full-width">
                    <Register
                      isAuthenticated={isAuthenticated}
                      onRegisterSuccess={toggleAuth}
                    />
                  </div>
                )
              }
            />
          </Routes>
        </motion.div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
