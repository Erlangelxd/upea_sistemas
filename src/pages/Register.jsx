import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Register({ isAuthenticated, onRegisterSuccess }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    carrera: "",
    semestre: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Ya estás registrado",
        description: "Redirigiendo a la página de inicio.",
        variant: "info",
      });
      navigate("/");
    }
  }, [isAuthenticated, navigate, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro:", formData);
    setShowSuccessMessage(true);
  };

  const handleNavigateHome = () => {
    if (onRegisterSuccess) onRegisterSuccess();
    navigate("/");
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
          <h2>¡Registro Exitoso!</h2>
          <p>Tu cuenta ha sido creada correctamente.</p>
          <motion.button
            onClick={handleNavigateHome}
            className="btn btn-primary"
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: "1.5rem" }}
          >
            Ir al Inicio
          </motion.button>
        </motion.div>
      ) : (
        <>
          <h2>Inicio de Sesión</h2>

          {/* Imagen de perfil fija (predeterminada) */}
          <motion.div className="profile-image-container" whileHover={{ scale: 1.05 }}>
            <img
              alt="Default profile"
              className="profile-image"
              src="https://w7.pngwing.com/pngs/128/223/png-transparent-user-person-profile-instagram-ui-colored-icon.png"
            />
          </motion.div>

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
              <label className="form-label">Carrera</label>
              <input
                type="text"
                name="carrera"
                className="form-input"
                value={formData.carrera}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div className="form-group">
              <label className="form-label">Semestre</label>
              <input
                type="number"
                name="semestre"
                className="form-input"
                value={formData.semestre}
                onChange={handleChange}
                min="1"
                max="12"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Sesión
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
}

export default Register;
