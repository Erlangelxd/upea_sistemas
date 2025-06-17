import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchFilter from "../components/Feed/SearchFilter";
import { getMaterias, getSemestres, getAcademicContents } from "../services/services_generales";
import Card from "../components/Feed/Tarjeta";
import handleUpload from "../components/Feed/PostsSection";
import UploadForm from "../components/Feed/Subirarchivo";
import UserProfileSidebar from "@/components/Feed/UserProfileSidebar";



function Home({ isAuthenticated, user, onUpdateUser }) {
  const [materias, setMaterias] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [academicContents, setAcademicContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState(null);
  const [filterSubject, setFilterSubject] = useState("");

  // 1. Obtención de semestres (separado)
  useEffect(() => {
    const fetchSemestres = async () => {
      try {
        console.log("Obteniendo semestres...");
        const response = await getSemestres();
        
        // Verificar si la respuesta es un array
        if (!Array.isArray(response)) {
          console.error("Error: La respuesta de semestres no es un array", response);
          return;
        }
        
        // Procesar semestres (asumiendo que cada item tiene 'nombre' o 'name')
        const semestresProcesados = response.map(item => {
          return {
            id: item.id || item.semester_id,
            nombre: item.nombre || item.name
          };
        }).filter(item => item.nombre); // Filtramos items sin nombre
        
        setSemestres(semestresProcesados);
        console.log("Semestres cargados:", semestresProcesados);
      } catch (error) {
        console.error("Error al obtener semestres:", error);
      }
    };

    fetchSemestres();
  }, []);

  // 2. Obtención de materias (separado)
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        console.log("Obteniendo materias...");
        const response = await getMaterias();
        
        if (!Array.isArray(response)) {
          console.error("Error: La respuesta de materias no es un array", response);
          return;
        }
        
        // Procesar materias
        const materiasProcesadas = response.map(item => {
          return {
            id: item.id || item.subject_id,
            nombre: item.nombre || item.name,
            semestre_id: item.semestre_id || item.semester_id,
            semestre: item.semestre || item.semester,
            descripcion: item.descripcion || item.description
          };
        }).filter(item => item.nombre); // Filtramos items sin nombre
        
        setMaterias(materiasProcesadas);
        console.log("Materias cargadas:", materiasProcesadas);
      } catch (error) {
        console.error("Error al obtener materias:", error);
      }
    };

    fetchMaterias();
  }, []);
      // 3. Obtención de academic_contents
    useEffect(() => {
      const fetchAcademicContents = async () => {
        try {
          console.log("Iniciando carga de contenidos...");
          const contents = await getAcademicContents();
          console.log("Contenidos recibidos:", contents);
          
          // Ahora contents debería ser directamente el array (result.data)
          setAcademicContents(Array.isArray(contents) ? contents : []);
          
        } catch (error) {
          console.error("Error cargando contenidos:", error);
          setAcademicContents([]); // Asegurar que siempre sea un array
        }
      };

      fetchAcademicContents();
    }, []);
  // 3. Resetear filtro de materia cuando cambia el semestre
  useEffect(() => {
    setFilterSubject("");
  }, [filterSemester]);

  // 4. Lista de todas las materias únicas
  const subjects = [...new Set(materias.map(m => m.nombre))];

  // 5. Materias filtradas por semestre seleccionado
  const filteredSubjects = filterSemester
    ? [...new Set(
        materias
          .filter(m => m.semestre_id === semestres.find(s => s.nombre === filterSemester)?.id)
          .map(m => m.nombre)
      )]
    : subjects;

  // 7. Filtrado de academic_contents
  const filteredContents = academicContents.filter(content => {
    const materia = materias.find(m => m.id === content.materia_id);
    const semestre = semestres.find(s => s.id === materia?.semestre_id);
    
    const matchesSemester = !filterSemester || semestre?.nombre === filterSemester;
    const matchesSubject = !filterSubject || materia?.nombre === filterSubject;
    const matchesSearch = !searchTerm || 
      content.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSemester && matchesSubject && matchesSearch;
  });

  return (
    <>
      {isAuthenticated && (
        <UserProfileSidebar user={user} onUpdateUser={onUpdateUser} />
      )}

      <div className={`content ${!isAuthenticated ? "content-centered-feed" : ""}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* {isAuthenticated && (
            <UploadForm
              onSubmit={handleUpload}
              subjects={subjects}
              semesters={semestres}
          />
          )} */}

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterSemester={filterSemester}
            setFilterSemester={setFilterSemester}
            filterSubject={filterSubject}
            setFilterSubject={setFilterSubject}
            semesters={semestres.map(s => s.nombre)}
            subjects={filteredSubjects}
          />

           {filteredContents.length > 0 ? (
            filteredContents.map((content, index) => {
              const materia = materias.find(m => m.id === content.materia_id);
              const semestre = semestres.find(s => s.id === materia?.semestre_id);
              
              return (
                <Card
                  key={`${content.id}-${index}`}
                  id={content.id}
                  titulo={content.titulo || "Sin título"}
                  descripcion={content.descripcion}
                  autor={content.autor || "Anónimo"}
                  tipo_contenido={content.tipo_contenido || "Documento"}
                  materia={materia?.nombre || "Sin materia"}
                  semestre={semestre?.nombre || "Sin semestre"}
                  fecha_subida={content.fecha_subida || new Date().toISOString()}
                  descargas={content.descargas || 0}
                  ruta_archivo={content.ruta_archivo || "#"}
                />
              );
            })
          ) : (
            <p>No hay datos</p>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Home;




// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import SearchFilter from "../components/Feed/SearchFilter";
// import { getMaterias, getSemestres } from "../services/services_generales";
// import Card from "../components/Feed/Tarjeta";
// import UploadForm from "../components/Feed/Subirarchivo";
// import handleUpload from "../components/Feed/PostsSection";
// import UserProfileSidebar from "@/components/Feed/UserProfileSidebar";

// function Home({ isAuthenticated, user, onUpdateUser }) {
//   const [datos, setData] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterSemester, setFilterSemester] = useState(null);
//   const [filterSubject, setFilterSubject] = useState("");

//   useEffect(() => {
//     getMaterias()
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error al obtener materias:", error));

//     getSemestres()
//       .then((data) => setSemesters(data.map((d) => d.nombre)))
//       .catch((error) => console.error("Error al obtener semestres:", error));
//   }, []);

//   useEffect(() => {
//     setFilterSubject(""); 
//   }, [filterSemester]);

//   const subjects = [...new Set(datos.map((d) => d.nombre))];

//   const filteredSubjects = filterSemester
//     ? [...new Set(datos.filter((d) => d.semestre === filterSemester).map((d) => d.nombre))]
//     : subjects;

//   const filteredData = datos.filter((d) => {
//     const matchesSemester = !filterSemester || d.semestre === filterSemester;
//     const matchesSubject = !filterSubject || d.nombre === filterSubject;
//     const matchesSearch = !searchTerm || d.nombre.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSemester && matchesSubject && matchesSearch;
//   });
//   //console.log(datos)
//   return (
//     <>
//       {isAuthenticated && (
//         <UserProfileSidebar user={user} onUpdateUser={onUpdateUser} />
//       )}

//       <div className={`content ${!isAuthenticated ? "content-centered-feed" : ""}`}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           {isAuthenticated && (
//             <UploadForm
//               onSubmit={handleUpload}
//               subjects={subjects}
//               semesters={semesters}
//             />
//           )}

//           <SearchFilter
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             filterSemester={filterSemester}
//             setFilterSemester={setFilterSemester}
//             filterSubject={filterSubject}
//             setFilterSubject={setFilterSubject}
//             semesters={semesters}
//             subjects={filteredSubjects}
//           />

//           {filteredData.length > 0 ? (
//             filteredData.map((d, i) => (
//               <Card
//                 key={i}
//                 id_semestre={d.semestre_id}
//                 nombre_materia={d.nombre}
//                 nombre_semestre={d.semestre}
//                 descripcion_materia={d.descripccion}
//               />
//             ))
//           ) : (
//             <p>No hay datos</p>
//           )}
//         </motion.div>
//       </div>
//     </>
//   );
// }

// export default Home;
