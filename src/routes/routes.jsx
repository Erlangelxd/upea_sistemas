import { Routes, Route } from "react-router-dom";
import Feed from "../pages/Feed";
import Register from "../pages/Register";
import Events from "../pages/Events";
import Chat from "../pages/Chat";
import Announcements from "../pages/Announcements";
import FAQ from "../pages/FAQ";
import UserProfile from "../pages/UserProfile";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";

function AppRoutes() {
  const { isAuthenticated, toggleAuth, currentUser, updateUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={currentUser} onUpdateUser={updateUser} />} />
      <Route path="/register" element={<Register isAuthenticated={isAuthenticated} onRegisterSuccess={toggleAuth} />} />
      <Route path="/events" element={<Events />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/faq" element={<FAQ />} />
      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <UserProfile user={currentUser} onUpdateUser={updateUser} />
          ) : (
            <Register isAuthenticated={isAuthenticated} onRegisterSuccess={toggleAuth} />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
