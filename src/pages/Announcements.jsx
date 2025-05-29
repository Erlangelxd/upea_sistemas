import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock } from "lucide-react";
import { getAnuncios } from "../services/services_generales";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnuncios();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error al obtener anuncios:", error);
      }
    };

    fetchAnnouncements();
  }, []);
  //console.log(announcements);

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

  return (
    <motion.div
      className="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="announcements-header">
        <h2>Anuncios Importantes</h2>
        <Bell size={24} />
      </div>

      <motion.div
        className="announcements-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id_anuncios}
            className={`card announcement-card ${announcement.prioridad}`}
            variants={itemVariants}
          >
            <h3>{announcement.titulo}</h3>
            <p className="announcement-content">{announcement.contenido}</p>

            <div className="announcement-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>{announcement.fecha_publicacion}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{announcement.hora_publicacion.substring(0, 5)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Announcements;
