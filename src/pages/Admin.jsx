import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Admin({ isAuthenticated, onRegisterSuccess }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "admin",
    correo: "admin@gmail.com",
    contrasena: "elasesinodedota123xdxdxd",
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Ya estás registrado",
        description: "Redirigiendo a la página de inicio.",
        variant: "info",
      });
      navigate("/panel_admin");
    }
  }, [isAuthenticated, navigate, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro:", formData);
    setShowSuccessMessage(true);
  };

  const handleNavigateHome = () => {
    if (onRegisterSuccess) onRegisterSuccess();
    navigate("/panel_admin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="register-container"
    >
      {showSuccessMessage ? (
        <motion.div
          className="success-message-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle size={64} className="success-icon" />
          <h2>¡Acceso Exitoso!</h2>
          <p>Bienvenido.</p>
          <motion.button
            onClick={handleNavigateHome}
            className="btn btn-primary"
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: "1.5rem" }}
          >
            Empezar
          </motion.button>
        </motion.div>
      ) : (
        <>
          <h2>Inicio de Sesión (Administrador)</h2>
          <form onSubmit={handleSubmit}>
            <motion.div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-input"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div className="form-group">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="correo"
                className="form-input"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div className="form-group">
              <label className="form-label">Contraseña de Administrador</label>
              <input
                type="password"
                name="contrasena"
                className="form-input"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              whileTap={{ scale: 0.95 }}
            >
              Ingresar
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
}

export default Admin;
