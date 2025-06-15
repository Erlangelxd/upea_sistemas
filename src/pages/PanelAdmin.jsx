import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; 

function PanelAdmin() {
  return (
    <motion.div>
      <h1>Panel de administrador</h1>
      <motion.div>
        <h2>Agregar un nuevo evento</h2>
        <motion.div className="form-group">
          <label className="form-label">Nombre del evento</label>
          <input
            type="text"
            name="nombre_evento"
            className="form-input"
          />
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha_evento"
            className="form-input"
          />
          <label className="form-label">Hora</label>
          <input
            type="time"
            name="hora_evento"
            className="form-input"
          />
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            name="ubicacion_evento"
            className="form-input"
          />
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion_evento"
            className="form-input"
          />
        </motion.div>
        <motion.button
          className="btn btn-primary"
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: "1.5rem" }}
        >
          Publicar evento
        </motion.button>
      </motion.div>

      <motion.div>
        <h2>Agregar un nuevo anuncio</h2>
        <motion.div className="form-group">
          <label className="form-label">Titulo del anuncio</label>
          <input
            type="text"
            name="nombre_anuncio"
            className="form-input"
          />
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion_anuncio"
            className="form-input"
          />
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha_anuncio"
            className="form-input"
          />
          <label className="form-label">Hora</label>
          <input
            type="time"
            name="hora_anuncio"
            className="form-input"
          />
        </motion.div>
        <motion.button
          className="btn btn-primary"
          whileTap={{ scale: 0.10 }}
          style={{ marginTop: "1rem" }}
        >
          Publicar anuncio
        </motion.button>
      </motion.div>
    </motion.div>
  )
};

export default PanelAdmin;
