
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

function Events() {
  const events = [
    {
      id: 1,
      title: "Conferencia de Innovación Tecnológica",
      date: "25 de Mayo, 2025",
      time: "15:00 - 18:00",
      location: "Auditorio Principal",
      description: "Únete a los líderes de la industria para explorar las últimas tendencias en tecnología y su impacto en el futuro de la educación.",
      capacity: "200 personas"
    },
    {
      id: 2,
      title: "Taller de Desarrollo Web Avanzado",
      date: "27 de Mayo, 2025",
      time: "10:00 - 14:00",
      location: "Laboratorio de Computación A-101",
      description: "Aprende las mejores prácticas en desarrollo web moderno con expertos de la industria. Trae tu laptop para participar en ejercicios prácticos.",
      capacity: "30 personas"
    },
    {
      id: 3,
      title: "Hackathon Universitario",
      date: "30 de Mayo, 2025",
      time: "09:00 - 21:00",
      location: "Centro de Innovación",
      description: "Compite en equipos para desarrollar soluciones innovadoras a problemas reales. Grandes premios para los ganadores.",
      capacity: "100 personas"
    }
  ];

  return (
    <motion.div 
      className="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Eventos de la Carrera</h2>
      
      <div className="events-grid">
        {events.map((event, index) => (
          <motion.div 
            key={event.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3>{event.title}</h3>
            
            <div className="event-details">
              <div className="event-info">
                <Calendar className="icon" size={20} />
                <div>
                  <p>{event.date}</p>
                  <p>{event.time}</p>
                </div>
              </div>
              
              <div className="event-info">
                <MapPin className="icon" size={20} />
                <p>{event.location}</p>
              </div>
              
              <div className="event-info">
                <Users className="icon" size={20} />
                <p>{event.capacity}</p>
              </div>
            </div>
            
            <p className="event-description">{event.description}</p>
            
            <motion.button 
              className="btn btn-primary"
              whileTap={{ scale: 0.95 }}
            >
              Registrarse
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Events;
