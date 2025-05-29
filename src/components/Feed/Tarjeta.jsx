import React from "react";
import { motion } from "framer-motion";
import { Book, Calendar, Download } from "lucide-react";

function Card({ id_semestre, nombre_materia, nombre_semestre, descripcion_materia }) {
  const handleDownload = () => {
    // Placeholder for download logic
    console.log(`Downloading post ${id_semestre}`);
    // In a real app, trigger file download here
  };

  return (
    <motion.div
      key={id_semestre}
      className="card content-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id_semestre * 0.05 + 0.2 }} // Stagger animation slightly
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <h3><b>{nombre_materia}</b></h3>
        <span className="content-type">{id_semestre}</span>
      </div>
      <h4>Descripcion de la Materia:</h4>
      <p>{descripcion_materia}</p>
      <div className="content-meta">
        <div className="meta-item">
          <Book size={16} />
          <span>{nombre_materia}</span>
        </div>
        <div className="meta-item">
          <Calendar size={16} />
          <span>{nombre_semestre}</span>
        </div>
      </div>

      <button onClick={handleDownload} className="btn btn-secondary">
        <Download size={18} />
        Descargar
      </button>
    </motion.div>
  );
}

export default Card;
