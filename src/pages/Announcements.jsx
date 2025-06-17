import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock } from "lucide-react";
import { getAnuncios } from "../services/services_generales";

// Nueva paleta de colores azul noche
const colors = {
  background: '#0F172A',     // Azul noche oscuro
  cardBg: '#1E293B',         // Fondo de tarjetas
  title: '#38BDF8',          // Azul claro para títulos
  text: '#E2E8F0',           // Texto principal (gris claro)
  textSecondary: '#94A3B8',  // Texto secundario
  accent: '#7DD3FC',         // Celeste para bordes/accent
  icon: '#60A5FA',           // Color de iconos
  priorityHigh: '#FCA5A5',   // Rojo suave para alta prioridad
  priorityMedium: '#FCD34D', // Amarillo suave para media prioridad
  priorityLow: '#86EFAC'     // Verde suave para baja prioridad
};

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnuncios();
        setAnnouncements(data || []);
      } catch (error) {
        console.error("Error al obtener anuncios:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Fecha no disponible";
    
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatearHora = (fechaYHora) => {
    if (!fechaYHora) return "--:--";
    
    return new Intl.DateTimeFormat("es-ES", { 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: true 
    }).format(new Date(fechaYHora));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: colors.background,
        padding: '2rem',
        minHeight: '100vh'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        maxWidth: '1200px',
        margin: '0 auto 2rem'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: colors.title,
          margin: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>Anuncios Importantes</h2>
        <Bell size={24} color={colors.icon} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            variants={itemVariants}
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              border: `2px solid ${colors.accent}`,
              transition: 'all 0.3s ease'
            }}
            whileHover={{ 
              y: -8,
              boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
              borderColor: colors.title
            }}
          >
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: colors.title,
              marginTop: 0,
              marginBottom: '1rem',
              borderBottom: `1px solid ${colors.accent}30`,
              paddingBottom: '0.5rem'
            }}>{announcement.titulo}</h3>
            
            <p style={{
              color: colors.text,
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              fontSize: '0.95rem'
            }}>{announcement.contenido}</p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              color: colors.textSecondary,
              fontSize: '0.875rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Calendar size={16} color={colors.icon} />
                <span>Fecha: {formatearFecha(announcement.fecha_publicacion)}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Clock size={16} color={colors.icon} />
                <span>Hora: {formatearHora(announcement.fecha_publicacion)}</span>
              </div>
            </div>

            {/* Indicador de prioridad */}
            <div style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 
                announcement.prioridad === 1 ? colors.priorityHigh :
                announcement.prioridad === 2 ? colors.priorityMedium :
                colors.priorityLow,
              boxShadow: `0 0 8px ${
                announcement.prioridad === 1 ? colors.priorityHigh :
                announcement.prioridad === 2 ? colors.priorityMedium :
                colors.priorityLow
              }`
            }} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Announcements;



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Bell, Calendar, Clock } from "lucide-react";
// import { getAnuncios } from "../services/services_generales";

// function Announcements() {
//   const [announcements, setAnnouncements] = useState([]);
  
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const data = await getAnuncios();
//         setAnnouncements(data || []);
//       } catch (error) {
//         console.error("Error al obtener anuncios:", error);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 1 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 },
//   };

//   const formatearFecha = (fecha) => {
//     if (!fecha) return "Fecha no disponible";
    
//     const date = new Date(fecha);
//     return date.toLocaleDateString("es-ES", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const formatearHora = (fechaYHora) => {
//     if (!fechaYHora) return "--:--";
    
//     return new Intl.DateTimeFormat("es-ES", { 
//       hour: "2-digit", 
//       minute: "2-digit", 
//       hour12: true 
//     }).format(new Date(fechaYHora));
//   };

//   // Función para determinar la clase de prioridad
//   const getPriorityClass = (priority) => {
//     switch(priority) {
//       case 1: return 'high-priority';
//       case 2: return 'medium-priority';
//       default: return 'low-priority';
//     }
//   };

//   return (
//     <motion.div
//       className="content"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="announcements-header" style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: '2rem'
//       }}>
//         <h2 style={{
//           fontSize: '1.8rem',
//           fontWeight: '600',
//           color: '#1F2937',
//           margin: 0
//         }}>Anuncios Importantes</h2>
//         <Bell size={24} color="#4F46E5" />
//       </div>

//       <motion.div
//         className="announcements-grid"
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//           gap: '1.5rem'
//         }}
//       >
//         {announcements.map((announcement) => (
//           <motion.div
//             key={announcement.id}
//             className={`card announcement-card ${getPriorityClass(announcement.prioridad)}`}
//             variants={itemVariants}
//             style={{
//               backgroundColor: '#FFFFFF',
//               borderRadius: '0.5rem',
//               padding: '1.5rem',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//               borderLeft: `4px solid ${
//                 announcement.prioridad === 1 ? '#EF4444' : 
//                 announcement.prioridad === 2 ? '#F59E0B' : '#10B981'
//               }`
//             }}
//             whileHover={{ y: -5, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
//           >
//             <h3 style={{
//               fontSize: '1.2rem',
//               fontWeight: '600',
//               color: '#1F2937',
//               marginTop: 0,
//               marginBottom: '1rem'
//             }}>{announcement.titulo}</h3>
            
//             <p className="announcement-content" style={{
//               color: '#4B5563',
//               lineHeight: '1.6',
//               marginBottom: '1.5rem'
//             }}>{announcement.contenido}</p>

//             <div className="announcement-meta" style={{
//               display: 'flex',
//               gap: '1.5rem',
//               color: '#6B7280',
//               fontSize: '0.875rem'
//             }}>
//               <div className="meta-item" style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem'
//               }}>
//                 <Calendar size={16} color="#6B7280" />
//                 <span>{formatearFecha(announcement.fecha_publicacion)}</span>
//               </div>
//               <div className="meta-item" style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem'
//               }}>
//                 <Clock size={16} color="#6B7280" />
//                 <span>{formatearHora(announcement.fecha_publicacion)}</span>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }

// export default Announcements;
 
 
 // import React, { useEffect, useState } from "react";
  // import { motion } from "framer-motion";
  // import { Bell, Calendar, Clock } from "lucide-react";
  // import { getAnuncios } from "../services/services_generales";

  // function Announcements() {
  //   const [announcements, setAnnouncements] = useState([]);
  //   useEffect(() => {
  //     const fetchAnnouncements = async () => {
  //       try {
  //         const data = await getAnuncios();
  //         console.log(data);
  //         setAnnouncements(data);
  //       } catch (error) {
  //         console.error("Error al obtener anuncios:", error);
  //       }
  //     };

  //     fetchAnnouncements();
  //   }, []);
  //   //console.log(announcements);

  //   const containerVariants = {
  //     hidden: { opacity: 1 },
  //     show: {
  //       opacity: 1,
  //       transition: {
  //         staggerChildren: 0.1,
  //       },
  //     },
  //   };

  //   const itemVariants = {
  //     hidden: { opacity: 0, y: 20 },
  //     show: { opacity: 1, y: 0 },
  //   };
  //     const formatearHora = (fechaYHora) =>
  //     fechaYHora
  //       ? new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date(fechaYHora))
  //       : "--:--";

  //   return (
  //     <motion.div
  //       className="content"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ duration: 0.3 }}
  //     >
  //       <div className="announcements-header">
  //         <h2>Anuncios Importantes</h2>
  //         <Bell size={24} />
  //       </div>

  //       <motion.div
  //         className="announcements-grid"
  //         variants={containerVariants}
  //         initial="hidden"
  //         animate="show"
  //       >
  //         {announcements.map((announcement) => (
  //           <motion.div
  //             key={announcement.id}
  //             className={`card announcement-card ${announcement.prioridad}`}
  //             variants={itemVariants}
  //           >
  //             <h3>{announcement.titulo}</h3>
  //             <p className="announcement-content">{announcement.contenido}</p>

  //             <div className="announcement-meta">
  //               <div className="meta-item">
  //                 <Calendar size={16} />
  //                 <span>{announcement.fecha_publicacion}</span>
  //               </div>
  //               <div className="meta-item">
  //                 <Clock size={16} />
  //                 <span>{announcement.fecha_publicacion.substring(11, 16)}</span>
  //               </div>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </motion.div>
  //     </motion.div>
  //   );
  // }

  // export default Announcements;
