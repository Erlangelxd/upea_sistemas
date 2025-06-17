import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Lock } from "lucide-react";

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
    // No hace nada - botón desactivado
    toast({
      title: "Registros deshabilitados",
      description: "El registro de nuevos usuarios no está disponible actualmente.",
      variant: "destructive",
    });
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
          
          {/* Mensaje de advertencia */}
          <motion.div 
            className="warning-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: "#fef3c7",
              color: "#92400e",
              padding: "1rem",
              borderRadius: "0.375rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Lock size={20} />
            <span>El registro de nuevos usuarios está actualmente deshabilitado</span>
          </motion.div>

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
                disabled
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
                disabled
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
                disabled
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
                disabled
              />
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              whileTap={{ scale: 0.95 }}
              disabled
              style={{
                opacity: 0.6,
                cursor: "not-allowed"
              }}
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









// import React, { useState, useEffect } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle, Lock } from "lucide-react";

// function Register({ isAuthenticated, onRegisterSuccess }) {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [pinVerified, setPinVerified] = useState(false);
//   const [pinInput, setPinInput] = useState("");
//   const correctPin = "1234"; // Cambia esto por tu PIN deseado

//   const [formData, setFormData] = useState({
//     nombre: "",
//     correo: "",
//     carrera: "",
//     semestre: "",
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       toast({
//         title: "Ya estás registrado",
//         description: "Redirigiendo a la página de inicio.",
//         variant: "info",
//       });
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate, toast]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!pinVerified) {
//       toast({
//         title: "Acceso denegado",
//         description: "Por favor ingresa el PIN correcto primero.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     console.log("Datos de registro:", formData);
//     setShowSuccessMessage(true);
//   };

//   const handlePinSubmit = (e) => {
//     e.preventDefault();
//     if (pinInput === correctPin) {
//       setPinVerified(true);
//       toast({
//         title: "PIN correcto",
//         description: "Ahora puedes completar el registro.",
//         variant: "success",
//       });
//     } else {
//       toast({
//         title: "PIN incorrecto",
//         description: "Por favor ingresa el PIN correcto.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleNavigateHome = () => {
//     if (onRegisterSuccess) onRegisterSuccess();
//     navigate("/");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (isAuthenticated) {
//     return null;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="register-container"
//       style={{ position: "relative" }}
//     >
//       {showSuccessMessage ? (
//         <motion.div
//           className="success-message-container"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <CheckCircle size={64} className="success-icon" />
//           <h2>¡Registro Exitoso!</h2>
//           <p>Tu cuenta ha sido creada correctamente.</p>
//           <motion.button
//             onClick={handleNavigateHome}
//             className="btn btn-primary"
//             whileTap={{ scale: 0.95 }}
//             style={{ marginTop: "1.5rem" }}
//           >
//             Ir al Inicio
//           </motion.button>
//         </motion.div>
//       ) : (
//         <>
//           {/* Overlay de PIN (solo visible cuando pinVerified es false) */}
//           {!pinVerified && (
//             <motion.div
//               className="pin-overlay"
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: "rgba(0, 0, 0, 0.8)",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 zIndex: 10,
//                 padding: "2rem",
//                 borderRadius: "8px",
//               }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Lock size={64} className="lock-icon" color="#ffffff" />
//               <h2 style={{ color: "#ffffff", margin: "1rem 0" }}>Acceso Restringido</h2>
//               <p style={{ color: "#ffffff", marginBottom: "2rem", textAlign: "center" }}>
//                 Por favor ingresa el PIN para continuar con el registro
//               </p>
              
//               <form onSubmit={handlePinSubmit} style={{ width: "100%", maxWidth: "300px" }}>
//                 <motion.div className="form-group" style={{ marginBottom: "1.5rem" }}>
//                   <input
//                     type="password"
//                     className="form-input"
//                     value={pinInput}
//                     onChange={(e) => setPinInput(e.target.value)}
//                     required
//                     maxLength="4"
//                     pattern="\d{4}"
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem",
//                       fontSize: "1.25rem",
//                       textAlign: "center",
//                       letterSpacing: "0.5rem",
//                     }}
//                     placeholder="____"
//                   />
//                 </motion.div>
                
//                 <motion.button
//                   type="submit"
//                   className="btn btn-primary"
//                   whileTap={{ scale: 0.95 }}
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem",
//                     fontSize: "1rem",
//                     backgroundColor: "#4f46e5",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Verificar PIN
//                 </motion.button>
//               </form>
//             </motion.div>
//           )}
          
//           {/* Formulario de registro (siempre visible pero funcional solo con PIN) */}
//           <h2>Inicio de Sesión</h2>

//           {/* Imagen de perfil fija (predeterminada) */}
//           <motion.div className="profile-image-container" whileHover={{ scale: 1.05 }}>
//             <img
//               alt="Default profile"
//               className="profile-image"
//               src="https://w7.pngwing.com/pngs/128/223/png-transparent-user-person-profile-instagram-ui-colored-icon.png"
//             />
//           </motion.div>

//           <form onSubmit={handleSubmit}>
//             <motion.div className="form-group">
//               <label className="form-label">Nombre</label>
//               <input
//                 type="text"
//                 name="nombre"
//                 className="form-input"
//                 value={formData.nombre}
//                 onChange={handleChange}
//                 required
//                 disabled={!pinVerified}
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Correo</label>
//               <input
//                 type="email"
//                 name="correo"
//                 className="form-input"
//                 value={formData.correo}
//                 onChange={handleChange}
//                 required
//                 disabled={!pinVerified}
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Carrera</label>
//               <input
//                 type="text"
//                 name="carrera"
//                 className="form-input"
//                 value={formData.carrera}
//                 onChange={handleChange}
//                 required
//                 disabled={!pinVerified}
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Semestre</label>
//               <input
//                 type="number"
//                 name="semestre"
//                 className="form-input"
//                 value={formData.semestre}
//                 onChange={handleChange}
//                 min="1"
//                 max="12"
//                 required
//                 disabled={!pinVerified}
//               />
//             </motion.div>

//             <motion.button
//               type="submit"
//               className="btn btn-primary"
//               whileTap={{ scale: 0.95 }}
//               disabled={!pinVerified}
//               style={{
//                 opacity: pinVerified ? 1 : 0.6,
//                 cursor: pinVerified ? "pointer" : "not-allowed",
//               }}
//             >
//               Iniciar Sesión
//             </motion.button>
//           </form>
//         </>
//       )}
//     </motion.div>
//   );
// }

// export default Register;













// import React, { useState, useEffect } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle, Lock } from "lucide-react";

// function Register({ isAuthenticated, onRegisterSuccess }) {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [pinVerified, setPinVerified] = useState(false);
//   const [pinInput, setPinInput] = useState("");
//   const correctPin = "1234"; // Cambia esto por tu PIN deseado

//   const [formData, setFormData] = useState({
//     nombre: "",
//     correo: "",
//     carrera: "",
//     semestre: "",
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       toast({
//         title: "Ya estás registrado",
//         description: "Redirigiendo a la página de inicio.",
//         variant: "info",
//       });
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate, toast]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!pinVerified) return; // Asegura que el PIN esté verificado
    
//     console.log("Datos de registro:", formData);
//     setShowSuccessMessage(true);
//   };

//   const handlePinSubmit = (e) => {
//     e.preventDefault();
//     if (pinInput === correctPin) {
//       setPinVerified(true);
//       toast({
//         title: "PIN correcto",
//         description: "Ahora puedes completar el registro.",
//         variant: "success",
//       });
//     } else {
//       toast({
//         title: "PIN incorrecto",
//         description: "Por favor ingresa el PIN correcto.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleNavigateHome = () => {
//     if (onRegisterSuccess) onRegisterSuccess();
//     navigate("/");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (isAuthenticated) {
//     return null;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="register-container"
//     >
//       {showSuccessMessage ? (
//         <motion.div
//           className="success-message-container"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <CheckCircle size={64} className="success-icon" />
//           <h2>¡Registro Exitoso!</h2>
//           <p>Tu cuenta ha sido creada correctamente.</p>
//           <motion.button
//             onClick={handleNavigateHome}
//             className="btn btn-primary"
//             whileTap={{ scale: 0.95 }}
//             style={{ marginTop: "1.5rem" }}
//           >
//             Ir al Inicio
//           </motion.button>
//         </motion.div>
//       ) : !pinVerified ? (
//         <motion.div
//           className="pin-container"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Lock size={64} className="lock-icon" />
//           <h2>Acceso Restringido</h2>
//           <p>Por favor ingresa el PIN para continuar con el registro</p>
          
//           <form onSubmit={handlePinSubmit}>
//             <motion.div className="form-group">
//               <label className="form-label">PIN de Acceso</label>
//               <input
//                 type="password"
//                 className="form-input"
//                 value={pinInput}
//                 onChange={(e) => setPinInput(e.target.value)}
//                 required
//                 maxLength="4"
//                 pattern="\d{4}"
//                 title="Por favor ingresa un PIN de 4 dígitos"
//               />
//             </motion.div>
            
//             <motion.button
//               type="submit"
//               className="btn btn-primary"
//               whileTap={{ scale: 0.95 }}
//             >
//               Verificar PIN
//             </motion.button>
//           </form>
//         </motion.div>
//       ) : (
//         <>
//           <h2>Inicio de Sesión</h2>

//           {/* Imagen de perfil fija (predeterminada) */}
//           <motion.div className="profile-image-container" whileHover={{ scale: 1.05 }}>
//             <img
//               alt="Default profile"
//               className="profile-image"
//               src="https://w7.pngwing.com/pngs/128/223/png-transparent-user-person-profile-instagram-ui-colored-icon.png"
//             />
//           </motion.div>

//           <form onSubmit={handleSubmit}>
//             <motion.div className="form-group">
//               <label className="form-label">Nombre</label>
//               <input
//                 type="text"
//                 name="nombre"
//                 className="form-input"
//                 value={formData.nombre}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Correo</label>
//               <input
//                 type="email"
//                 name="correo"
//                 className="form-input"
//                 value={formData.correo}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Carrera</label>
//               <input
//                 type="text"
//                 name="carrera"
//                 className="form-input"
//                 value={formData.carrera}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Semestre</label>
//               <input
//                 type="number"
//                 name="semestre"
//                 className="form-input"
//                 value={formData.semestre}
//                 onChange={handleChange}
//                 min="1"
//                 max="12"
//                 required
//               />
//             </motion.div>

//             <motion.button
//               type="submit"
//               className="btn btn-primary"
//               whileTap={{ scale: 0.95 }}
//             >
//               Iniciar Sesión
//             </motion.button>
//           </form>
//         </>
//       )}
//     </motion.div>
//   );
// }

// export default Register;



// import React, { useState, useEffect } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle } from "lucide-react";

// function Register({ isAuthenticated, onRegisterSuccess }) {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const [formData, setFormData] = useState({
//     nombre: "",
//     correo: "",
//     carrera: "",
//     semestre: "",
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       toast({
//         title: "Ya estás registrado",
//         description: "Redirigiendo a la página de inicio.",
//         variant: "info",
//       });
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate, toast]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Datos de registro:", formData);
//     setShowSuccessMessage(true);
//   };

//   const handleNavigateHome = () => {
//     if (onRegisterSuccess) onRegisterSuccess();
//     navigate("/");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (isAuthenticated) {
//     return null;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="register-container"
//     >
//       {showSuccessMessage ? (
//         <motion.div
//           className="success-message-container"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <CheckCircle size={64} className="success-icon" />
//           <h2>¡Registro Exitoso!</h2>
//           <p>Tu cuenta ha sido creada correctamente.</p>
//           <motion.button
//             onClick={handleNavigateHome}
//             className="btn btn-primary"
//             whileTap={{ scale: 0.95 }}
//             style={{ marginTop: "1.5rem" }}
//           >
//             Ir al Inicio
//           </motion.button>
//         </motion.div>
//       ) : (
//         <>
//           <h2>Inicio de Sesión</h2>

//           {/* Imagen de perfil fija (predeterminada) */}
//           <motion.div className="profile-image-container" whileHover={{ scale: 1.05 }}>
//             <img
//               alt="Default profile"
//               className="profile-image"
//               src="https://w7.pngwing.com/pngs/128/223/png-transparent-user-person-profile-instagram-ui-colored-icon.png"
//             />
//           </motion.div>

//           <form onSubmit={handleSubmit}>
//             <motion.div className="form-group">
//               <label className="form-label">Nombre</label>
//               <input
//                 type="text"
//                 name="nombre"
//                 className="form-input"
//                 value={formData.nombre}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Correo</label>
//               <input
//                 type="email"
//                 name="correo"
//                 className="form-input"
//                 value={formData.correo}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Carrera</label>
//               <input
//                 type="text"
//                 name="carrera"
//                 className="form-input"
//                 value={formData.carrera}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div className="form-group">
//               <label className="form-label">Semestre</label>
//               <input
//                 type="number"
//                 name="semestre"
//                 className="form-input"
//                 value={formData.semestre}
//                 onChange={handleChange}
//                 min="1"
//                 max="12"
//                 required
//               />
//             </motion.div>

//             <motion.button
//               type="submit"
//               className="btn btn-primary"
//               whileTap={{ scale: 0.95 }}
//             >
//               Iniciar Sesión
//             </motion.button>
//           </form>
//         </>
//       )}
//     </motion.div>
//   );
// }

// export default Register;
