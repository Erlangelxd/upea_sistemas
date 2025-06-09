import React from "react";
function PanelAdmin() {
  return (
    <motion.div>
      <h1>Panel de administrador</h1>
      <h2>Agrega un evento</h2>
      <motion.div className="form-group">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="form-input"
        />
      </motion.div>
      <h2>Agrega un anuncio</h2>
      <motion.div className="form-group">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="form-input"
        />
      </motion.div>
    </motion.div>
  )
};

export default PanelAdmin;
