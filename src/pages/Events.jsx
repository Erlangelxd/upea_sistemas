// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
// import { getEventos } from "../services/services_generales";

// function Events() {
//   const [events, setEvents] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("Todos");

//   useEffect(() => {
//     const fetchEventos = async () => {
//       try {
//         const data = await getEventos();
//         setEvents(data || []);
//       } catch (error) {
//         console.error("Error al obtener eventos:", error);
//       }
//     };
//     fetchEventos();
//   }, []);

//   const formatearFecha = (fecha) =>
//     fecha
//       ? new Date(fecha).toLocaleDateString("es-ES", {
//           weekday: 'long',
//           day: "numeric",
//           month: "long",
//           year: "numeric",
//         })
//       : "Fecha no disponible";

//   const formatearHora = (fechaYHora) =>
//     fechaYHora
//       ? new Intl.DateTimeFormat("es-ES", { 
//           hour: "2-digit", 
//           minute: "2-digit", 
//           hour12: true 
//         }).format(new Date(fechaYHora))
//       : "--:--";

//   const eventTypes = ["Todos", "Taller", "Conferencia", "Seminario"];
  
//   const filteredEvents = activeFilter === "Todos" 
//     ? events 
//     : events.filter(event => event.tipo_evento === activeFilter);

//   return (
//     <div className="events-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
//           <motion.h2 
//             style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#4f46e5' }}
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Eventos Académicos
//           </motion.h2>
//           <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '42rem', margin: '0 auto' }}>
//             Descubre los próximos talleres, conferencias y actividades que tenemos preparados para ti.
//           </p>
//         </div>

//         {/* Filtros */}
//         <motion.div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
//           {eventTypes.map((type) => (
//             <motion.button
//               key={type}
//               onClick={() => setActiveFilter(type)}
//               style={{
//                 padding: '0.5rem 1rem',
//                 borderRadius: '9999px',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//                 transition: 'all 0.3s',
//                 ...(activeFilter === type
//                   ? { backgroundColor: '#4f46e5', color: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }
//                   : { backgroundColor: '#f3f4f6', color: '#374151' })
//               }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {type}
//             </motion.button>
//           ))}
//         </motion.div>

//         {filteredEvents.length === 0 ? (
//           <motion.div 
//             style={{ textAlign: 'center', padding: '3rem 0' }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.5rem' }}>
//               No hay eventos disponibles
//             </h3>
//             <p style={{ color: '#6b7280' }}>
//               Pronto anunciaremos nuevos eventos. ¡Mantente atento!
//             </p>
//           </motion.div>
//         ) : (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
//             {filteredEvents.map((event) => (
//               <motion.div
//                 key={event.id}
//                 style={{
//                   backgroundColor: 'white',
//                   borderRadius: '0.75rem',
//                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//                   overflow: 'hidden',
//                   border: '1px solid #e5e7eb'
//                 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 whileHover={{ y: -5 }}
//               >
//                 {/* Encabezado */}
//                 <div style={{
//                   padding: '1.5rem',
//                   ...(event.tipo_evento === "Taller" ? { backgroundColor: '#3b82f6' } : 
//                     event.tipo_evento === "Conferencia" ? { backgroundColor: '#8b5cf6' } : 
//                     { backgroundColor: '#4f46e5' })
//                 }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <span style={{ color: 'white', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase' }}>
//                       {event.tipo_evento}
//                     </span>
//                     <span style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
//                       {formatearFecha(event.fecha_inicio)}
//                     </span>
//                   </div>
//                   <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginTop: '0.5rem' }}>
//                     {event.titulo}
//                   </h3>
//                 </div>

//                 {/* Cuerpo */}
//                 <div style={{ padding: '1.5rem' }}>
//                   <p style={{ color: '#374151', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//                     {event.descripcion}
//                   </p>

//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
//                       <Clock style={{ color: '#4f46e5', flexShrink: 0 }} size={18} />
//                       <div>
//                         <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
//                           {formatearHora(event.fecha_inicio)} - {formatearHora(event.fecha_fin)}
//                         </p>
//                         <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
//                           Duración: {Math.round(
//                             (new Date(event.fecha_fin) - new Date(event.fecha_inicio)) / (1000 * 60 * 60),
//                           )
//                           } horas
//                         </p>
//                       </div>
//                     </div>

//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
//                       <MapPin style={{ color: '#4f46e5', flexShrink: 0 }} size={18} />
//                       <div>
//                         <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
//                           {event.ubicacion}
//                         </p>
//                         <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
//                           Presencial
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <motion.button
//                     style={{
//                       marginTop: '1.5rem',
//                       width: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '0.5rem',
//                       padding: '0.5rem 1rem',
//                       backgroundColor: '#eef2ff',
//                       color: '#4f46e5',
//                       borderRadius: '0.5rem',
//                       fontWeight: '500',
//                       transition: 'background-color 0.3s'
//                     }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Más información
//                     <ArrowRight size={16} />
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Events;













// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
// import { getEventos } from "../services/services_generales";

// // Paleta de colores global
// const colors = {
//   primary: '#4F46E5',       // Indigo-600
//   primaryLight: '#6366F1',  // Indigo-500
//   secondary: '#10B981',     // Emerald-500
//   dark: '#1F2937',         // Gray-800
//   medium: '#6B7280',       // Gray-500
//   light: '#F3F4F6',        // Gray-100
//   white: '#FFFFFF',
//   accent: '#F59E0B',       // Amber-500
//   danger: '#EF4444',       // Red-500
//   success: '#10B981'       // Emerald-500
// };

// function Events() {
//   const [events, setEvents] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("Todos");

//   useEffect(() => {
//     const fetchEventos = async () => {
//       try {
//         const data = await getEventos();
//         setEvents(data || []);
//       } catch (error) {
//         console.error("Error al obtener eventos:", error);
//       }
//     };
//     fetchEventos();
//   }, []);

//   const formatearFecha = (fecha) =>
//     fecha
//       ? new Date(fecha).toLocaleDateString("es-ES", {
//           weekday: 'long',
//           day: "numeric",
//           month: "long",
//           year: "numeric",
//         })
//       : "Fecha no disponible";

//   const formatearHora = (fechaYHora) =>
//     fechaYHora
//       ? new Intl.DateTimeFormat("es-ES", { 
//           hour: "2-digit", 
//           minute: "2-digit", 
//           hour12: true 
//         }).format(new Date(fechaYHora))
//       : "--:--";

//   const eventTypes = ["Todos", "Taller", "Conferencia", "Seminario"];
  
//   const filteredEvents = activeFilter === "Todos" 
//     ? events 
//     : events.filter(event => event.tipo_evento === activeFilter);

//   return (
//     <div className="events-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
//           <motion.h2 
//             style={{ 
//               fontSize: '2rem', 
//               fontWeight: '700', 
//               marginBottom: '1rem', 
//               color: colors.dark,
//               background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               display: 'inline-block'
//             }} 
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Eventos de la Carrera
//           </motion.h2>
//           <p style={{ 
//             fontSize: '1rem', 
//             color: colors.medium, 
//             maxWidth: '42rem', 
//             margin: '0 auto',
//             lineHeight: '1.6'
//           }}>
//             Descubre los próximos talleres, conferencias y actividades que tenemos preparados para ti.
//           </p>
//         </div>

//         {/* Filtros */}
//         <motion.div style={{ 
//           display: 'flex', 
//           flexWrap: 'wrap', 
//           justifyContent: 'center', 
//           gap: '0.75rem', 
//           marginBottom: '2.5rem'
//         }}>
//           {eventTypes.map((type) => (
//             <motion.button
//               key={type}
//               onClick={() => setActiveFilter(type)}
//               style={{
//                 padding: '0.6rem 1.25rem',
//                 borderRadius: '9999px',
//                 fontSize: '0.875rem',
//                 fontWeight: '600',
//                 transition: 'all 0.3s',
//                 cursor: 'pointer',
//                 ...(activeFilter === type
//                   ? { 
//                       backgroundColor: colors.primary, 
//                       color: colors.white,
//                       boxShadow: `0 4px 6px -1px rgba(79, 70, 229, 0.3)`
//                     }
//                   : { 
//                       backgroundColor: colors.light, 
//                       color: colors.dark,
//                       '&:hover': {
//                         backgroundColor: '#E5E7EB'
//                       }
//                     })
//               }}
//               whileHover={{ scale: 1.05, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {type}
//             </motion.button>
//           ))}
//         </motion.div>

//         {filteredEvents.length === 0 ? (
//           <motion.div 
//             style={{ 
//               textAlign: 'center', 
//               padding: '3rem 0',
//               backgroundColor: colors.light,
//               borderRadius: '0.5rem'
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <p style={{ 
//               color: colors.medium,
//               fontSize: '1.1rem'
//             }}>
//               No hay eventos disponibles en este momento.
//             </p>
//           </motion.div>
//         ) : (
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
//             gap: '1.75rem'
//           }}>
//             {filteredEvents.map((event) => (
//               <motion.div
//                 key={event.id}
//                 style={{
//                   backgroundColor: colors.white,
//                   borderRadius: '0.75rem',
//                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//                   overflow: 'hidden',
//                   border: `1px solid ${colors.light}`,
//                   transition: 'transform 0.3s, box-shadow 0.3s'
//                 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 whileHover={{ 
//                   y: -8,
//                   boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
//                 }}
//               >
//                 {/* Encabezado */}
//                 <div style={{
//                   padding: '1.5rem',
//                   backgroundColor: colors.light,
//                   borderBottom: `1px solid ${colors.light}`
//                 }}>
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center',
//                     marginBottom: '0.5rem'
//                   }}>
//                     <span style={{ 
//                       color: colors.primary,
//                       fontWeight: '600', 
//                       fontSize: '0.875rem',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.05em'
//                     }}>
//                       {event.tipo_evento}
//                     </span>
//                     <span style={{ 
//                       color: colors.primary, 
//                       backgroundColor: `${colors.primary}10`, 
//                       padding: '0.25rem 0.75rem', 
//                       borderRadius: '9999px', 
//                       fontSize: '0.75rem',
//                       fontWeight: '600'
//                     }}>
//                       {formatearFecha(event.fecha_inicio)}
//                     </span>
//                   </div>
//                   <h3 style={{ 
//                     fontSize: '1.25rem', 
//                     fontWeight: '700', 
//                     color: colors.dark, 
//                     marginTop: '0.5rem',
//                     lineHeight: '1.4'
//                   }}>
//                     {event.titulo}
//                   </h3>
//                 </div>

//                 {/* Cuerpo */}
//                 <div style={{ padding: '1.5rem' }}>
//                   <p style={{ 
//                     color: colors.medium, 
//                     marginBottom: '1.5rem', 
//                     display: '-webkit-box', 
//                     WebkitLineClamp: 3, 
//                     WebkitBoxOrient: 'vertical', 
//                     overflow: 'hidden',
//                     lineHeight: '1.6'
//                   }}>
//                     {event.descripcion}
//                   </p>

//                   <div style={{ 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     gap: '1rem',
//                     marginBottom: '1.5rem'
//                   }}>
//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
//                       <Clock style={{ color: colors.primary, flexShrink: 0 }} size={18} />
//                       <div>
//                         <p style={{ 
//                           fontSize: '0.875rem', 
//                           fontWeight: '600', 
//                           color: colors.dark,
//                           marginBottom: '0.25rem'
//                         }}>
//                           {formatearHora(event.fecha_inicio)} - {formatearHora(event.fecha_fin)}
//                         </p>
//                         <p style={{ 
//                           fontSize: '0.75rem', 
//                           color: colors.medium,
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '0.25rem'
//                         }}>
//                           <span style={{
//                             display: 'inline-block',
//                             width: '4px',
//                             height: '4px',
//                             borderRadius: '50%',
//                             backgroundColor: colors.medium
//                           }}></span>
//                           Duración: {Math.round(
//                             (new Date(event.fecha_fin) - new Date(event.fecha_inicio)) / (1000 * 60 * 60),
//                           )} horas
//                         </p>
//                       </div>
//                     </div>

//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
//                       <MapPin style={{ color: colors.primary, flexShrink: 0 }} size={18} />
//                       <div>
//                         <p style={{ 
//                           fontSize: '0.875rem', 
//                           fontWeight: '600', 
//                           color: colors.dark,
//                           marginBottom: '0.25rem'
//                         }}>
//                           {event.ubicacion}
//                         </p>
//                         <p style={{ 
//                           fontSize: '0.75rem', 
//                           color: colors.medium,
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '0.25rem'
//                         }}>
//                           <span style={{
//                             display: 'inline-block',
//                             width: '4px',
//                             height: '4px',
//                             borderRadius: '50%',
//                             backgroundColor: colors.medium
//                           }}></span>
//                           Presencial
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <motion.button
//                     style={{
//                       marginTop: '0.5rem',
//                       width: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '0.5rem',
//                       padding: '0.75rem 1rem',
//                       backgroundColor: colors.primary,
//                       color: colors.white,
//                       borderRadius: '0.5rem',
//                       fontWeight: '600',
//                       transition: 'all 0.3s',
//                       border: 'none',
//                       fontSize: '0.875rem'
//                     }}
//                     whileHover={{ 
//                       backgroundColor: colors.primaryLight,
//                       boxShadow: `0 4px 6px -1px rgba(79, 70, 229, 0.3)`
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Más información
//                     <ArrowRight size={16} />
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Events;












import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { getEventos } from "../services/services_generales";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventos();
        console.log(data);
        setEvents(data || []);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  const formatearFecha = (fecha) =>
    fecha
      ? new Date(fecha).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Fecha no disponible";

  const formatearHora = (fechaYHora) =>
    fechaYHora
      ? new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date(fechaYHora))
      : "--:--";

  return (
    <motion.div
      className="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Eventos de la Carrera</h2>

      {events.length === 0 ? (
        <p>No hay eventos disponibles en este momento.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-2">{event.titulo}</h3>

              <div className="event-details space-y-2">
                <div className="event-info flex items-center gap-2">
                  <Calendar size={20} />
                  <div>
                    <p>Fecha de inicio: {formatearFecha(event.fecha_inicio)}</p>
                    <p>Fecha Fin: {formatearFecha(event.fecha_fin)}</p>
                    <p className="text-sm text-gray-500">
                      Hora: {formatearHora(event.fecha_inicio)} - {formatearHora(event.fecha_fin)}
                    </p>
                  </div>
                </div>

                <div className="event-info flex items-center gap-2">
                  <MapPin size={20} />
                  <p>Ubicacion: {event.ubicacion}</p>
                </div>
              </div>
              <p className="event-description mt-2 text-sm text-gray-700">Descripcion: {event.descripcion}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Events;
