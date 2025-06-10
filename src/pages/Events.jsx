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

  const formatearHora = (hora) => (hora ? hora.substring(0, 5) : "--:--");

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
              key={event.id_eventos}
              className="card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-2">{event.titulo}</h3>

              <div className="event-details space-y-2">
                <div className="event-info flex items-center gap-2">
                  <Calendar size={20} />
                  <div>
                    <p>{formatearFecha(event.fecha_evento)}</p>
                    <p className="text-sm text-gray-500">
                      {formatearHora(event.hora_inicio)} - {formatearHora(event.hora_fin)}
                    </p>
                  </div>
                </div>

                <div className="event-info flex items-center gap-2">
                  <MapPin size={20} />
                  <p>{event.lugar}</p>
                </div>
              </div>
              <p className="event-description mt-2 text-sm text-gray-700">{event.descripcion}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Events;
