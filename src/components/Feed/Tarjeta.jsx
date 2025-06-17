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
      className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (id % 10) * 0.05 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 flex-1">
            {titulo || "Sin título"}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
            {tipo_contenido || "Documento"}
          </span>
        </div>

        {/* Descripción */}
        {descripcion && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-1">Descripción:</h4>
            <p className="text-gray-700 text-sm line-clamp-3">
              {descripcion}
            </p>
          </div>
        )}

        {/* Metadatos */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Book size={14} className="mr-1.5 min-w-[16px] text-gray-500" />
            <span className="truncate">{materia || "Sin materia"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-1.5 min-w-[16px] text-gray-500" />
            <span className="truncate">{semestre || "Sin semestre"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User size={14} className="mr-1.5 min-w-[16px] text-gray-500" />
            <span className="truncate">{autor || "Anónimo"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1.5 min-w-[16px] text-gray-500" />
            <span className="truncate">
              {fecha_subida ? formatDate(fecha_subida) : "Sin fecha"}
            </span>
          </div>
                            {/* <div className="meta-item">
          <FileText size={16} />
          <span>{tipo_contenido || "Sin tipo"}</span>
        </div> */}
        </div>

        {/* Botón de descarga */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200 text-sm sm:text-base"
        >
          <Download size={16} className="mr-2" />
          Descargar ({descargas || 0})
        </button>
      </div>
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
