import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchFilter from "../components/Feed/SearchFilter";
import { getMaterias, getSemestres } from "../services/services_generales";
import Card from "../components/Feed/Tarjeta";
import UploadForm from "../components/Feed/Subirarchivo";
import handleUpload from "../components/Feed/PostsSection";
import UserProfileSidebar from "@/components/Feed/UserProfileSidebar";

function Home({ isAuthenticated, user, onUpdateUser }) {
  const [datos, setData] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState(null);
  const [filterSubject, setFilterSubject] = useState("");

  useEffect(() => {
    getMaterias()
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener materias:", error));

    getSemestres()
      .then((data) => setSemesters(data.map((d) => d.nombre)))
      .catch((error) => console.error("Error al obtener semestres:", error));
  }, []);

  useEffect(() => {
    setFilterSubject(""); 
  }, [filterSemester]);

  const subjects = [...new Set(datos.map((d) => d.nombre))];

  const filteredSubjects = filterSemester
    ? [...new Set(datos.filter((d) => d.semestre === filterSemester).map((d) => d.nombre))]
    : subjects;

  const filteredData = datos.filter((d) => {
    const matchesSemester = !filterSemester || d.semestre === filterSemester;
    const matchesSubject = !filterSubject || d.nombre === filterSubject;
    const matchesSearch = !searchTerm || d.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSemester && matchesSubject && matchesSearch;
  });
  //console.log(datos)
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
          {isAuthenticated && (
            <UploadForm
              onSubmit={handleUpload}
              subjects={subjects}
              semesters={semesters}
            />
          )}

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterSemester={filterSemester}
            setFilterSemester={setFilterSemester}
            filterSubject={filterSubject}
            setFilterSubject={setFilterSubject}
            semesters={semesters}
            subjects={filteredSubjects}
          />

          {filteredData.length > 0 ? (
            filteredData.map((d, i) => (
              <Card
                key={i}
                id_semestre={d.semestre_id}
                nombre_materia={d.nombre}
                nombre_semestre={d.semestre}
                descripcion_materia={d.descripccion}
              />
            ))
          ) : (
            <p>No hay datos</p>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Home;
