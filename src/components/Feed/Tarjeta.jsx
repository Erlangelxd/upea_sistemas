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
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl lg:max-w-3xl mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (id % 10) * 0.05 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-800 md:text-xl lg:text-2xl">
            {titulo || "Sin título"}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {tipo_contenido || "Documento"}
          </span>
        </div>

        {descripcion && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-1 md:text-base">Descripción:</h4>
            <p className="text-gray-600 text-sm md:text-base">{descripcion}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center space-x-2">
            <Book size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 md:text-base">{materia || "Sin materia"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 md:text-base">{semestre || "Sin semestre"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 md:text-base">{autor || "Anónimo"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 md:text-base">
              {fecha_subida ? formatDate(fecha_subida) : "Sin fecha"}
            </span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          <Download size={18} />
          <span>Descargar ({descargas || 0})</span>
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
