import React from "react";
import { motion } from "framer-motion";
import { Book, Calendar, Download, FileText, User, Clock } from "lucide-react";

function Card({ 
  id,
  titulo,
  descripcion,
  autor,
  tipo_contenido,
  materia,
  semestre,
  fecha_subida,
  descargas,
  ruta_archivo
}) {
  const handleDownload = (e) => {
    e.preventDefault();
    window.open(ruta_archivo, '_blank');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <motion.div
      className="card content-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.05 + 0.2 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <h3><b>{titulo || "Sin título"}</b></h3>
        <span className="content-type">{tipo_contenido || "Documento"}</span>
      </div>

      {descripcion && (
        <>
          <h4>Descripción:</h4>
          <p>{descripcion}</p>
        </>
      )}

      <div className="content-meta">
        <div className="meta-item">
          <Book size={16} />
          <span>{materia || "Sin materia"}</span>
        </div>
        <div className="meta-item">
          <Calendar size={16} />
          <span>{semestre || "Sin semestre"}</span>
        </div>
        <div className="meta-item">
          <User size={16} />
          <span>{autor || "Anónimo"}</span>
        </div>
        <div className="meta-item">
          <Clock size={16} />
          <span>{fecha_subida ? formatDate(fecha_subida) : "Sin fecha"}</span>
        </div>
        {/* <div className="meta-item">
          <FileText size={16} />
          <span>{tipo_contenido || "Sin tipo"}</span>
        </div> */}
      </div>

      <a 
        href={ruta_archivo || "#"} 
        onClick={handleDownload}
        className="btn btn-secondary"
      >
        <Download size={18} />
        Descargar ({descargas || 0})
      </a>
    </motion.div>
  );
}

export default Card;





// import React from "react";
// import { motion } from "framer-motion";
// import { Book, Calendar, Download } from "lucide-react";

// function Card({ id_semestre, nombre_materia, nombre_semestre, descripcion_materia }) {
//   // const handleDownload = () => {
//   //   // Placeholder for download logic
//   //   console.log(`Downloading post ${id_semestre}`);
//   //   // In a real app, trigger file download here
//   // };

//   return (
//     <motion.div
//       key={id_semestre}
//       className="card content-card"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: id_semestre * 0.05 + 0.2 }} // Stagger animation slightly
//       exit={{ opacity: 0, y: -20 }}
//     >
//       <div className="content-header">
//         <h3><b>{nombre_materia}</b></h3>
//         <span className="content-type">{id_semestre}</span>
//       </div>
//       <h4>Descripcion de la Materia:</h4>
//       <p>{descripcion_materia}</p>
//       <div className="content-meta">
//         <div className="meta-item">
//           <Book size={16} />
//           <span>{nombre_materia}</span>
//         </div>
//         <div className="meta-item">
//           <Calendar size={16} />
//           <span>{nombre_semestre}</span>
//         </div>
//       </div>

//       {/* <button onClick={handleDownload} className="btn btn-secondary">
//         <Download size={18} />
        
//       </button> */}
      
//       <a href="algo.pdf" download   className="btn btn-secondary" >Descargar</a>
//     </motion.div>
//   );
// }

// export default Card;
