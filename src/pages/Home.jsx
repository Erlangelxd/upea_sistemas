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
  const [isMobile, setIsMobile] = useState(false);

  // Verificar el tamaño de la pantalla al cargar y al cambiar tamaño
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 1. Obtención de semestres
  useEffect(() => {
    const fetchSemestres = async () => {
      try {
        const response = await getSemestres();
        
        if (!Array.isArray(response)) {
          console.error("Error: La respuesta de semestres no es un array", response);
          return;
        }
        
        const semestresProcesados = response.map(item => {
          return {
            id: item.id || item.semester_id,
            nombre: item.nombre || item.name
          };
        }).filter(item => item.nombre);
        
        setSemestres(semestresProcesados);
      } catch (error) {
        console.error("Error al obtener semestres:", error);
      }
    };

    fetchSemestres();
  }, []);

  // 2. Obtención de materias
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await getMaterias();
        
        if (!Array.isArray(response)) {
          console.error("Error: La respuesta de materias no es un array", response);
          return;
        }
        
        const materiasProcesadas = response.map(item => {
          return {
            id: item.id || item.subject_id,
            nombre: item.nombre || item.name,
            semestre_id: item.semestre_id || item.semester_id,
            semestre: item.semestre || item.semester,
            descripcion: item.descripcion || item.description
          };
        }).filter(item => item.nombre);
        
        setMaterias(materiasProcesadas);
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
        const contents = await getAcademicContents();
        setAcademicContents(Array.isArray(contents) ? contents : []);
      } catch (error) {
        console.error("Error cargando contenidos:", error);
        setAcademicContents([]);
      }
    };

    fetchAcademicContents();
  }, []);

  // Resetear filtro de materia cuando cambia el semestre
  useEffect(() => {
    setFilterSubject("");
  }, [filterSemester]);

  // Lista de todas las materias únicas
  const subjects = [...new Set(materias.map(m => m.nombre))];

  // Materias filtradas por semestre seleccionado
  const filteredSubjects = filterSemester
    ? [...new Set(
        materias
          .filter(m => m.semestre_id === semestres.find(s => s.nombre === filterSemester)?.id)
          .map(m => m.nombre)
      )]
    : subjects;

  // Filtrado de academic_contents
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
    <div className="min-h-screen bg-gray-100">
      <div className={`flex ${isMobile ? 'flex-col' : ''}`}>
        {isAuthenticated && (
          <div className={`${isMobile ? 'w-full' : 'w-1/4 fixed h-screen'}`}>
            <UserProfileSidebar user={user} onUpdateUser={onUpdateUser} />
          </div>
        )}

        <div 
          className={`${isAuthenticated ? (isMobile ? 'w-full mt-16' : 'w-3/4 ml-auto') : 'w-full'} p-4`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
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
              isMobile={isMobile}
            />

            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4 mt-6`}>
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
                      isMobile={isMobile}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">No se encontraron contenidos académicos</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
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
