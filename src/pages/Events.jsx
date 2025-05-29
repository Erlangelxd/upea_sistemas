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
        setEvents(data);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    fetchEventos();
  }, []);
  // console.log(events);

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
            key={event.id_eventos}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <p>Nro de Evento: {event.id_eventos}</p>
            <h3>{event.titulo}</h3>  

            <div className="event-details">
              <div className="event-info">
                <Calendar className="icon" size={20} />
                <div>
                  <p>
                    {new Date(event.fecha_evento).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    {event.hora_inicio.substring(0, 5)} - {event.hora_fin.substring(0, 5)}
                  </p>
                </div>
              </div>

              <div className="event-info">
                <MapPin className="icon" size={20} />
                <p>{event.lugar}</p>
              </div>

              <div className="event-info">
                <Users className="icon" size={20} />
                <p>{event.capacidad}</p>
              </div>
            </div>

            <p className="event-description">{event.descripcion}</p>

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
