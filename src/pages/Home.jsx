import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import SearchFilter from "../components/Feed/SearchFilter";
import { getMaterias, getSemestres } from "../services/services_generales";
import Card from "../components/Feed/Tarjeta";
// import UploadForm from "../components/Feed/UploadForm";
import UploadForm from "../components/Feed/Subirarchivo";
import handleUpload from "../components/Feed/PostsSection";
import UserProfileSidebar from '@/components/Feed/UserProfileSidebar'; 

function Home({ isAuthenticated, user, onUpdateUser }) {
  const [content, setContent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [file, setFile] = useState(null);
  const [filterSemester, setFilterSemester] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [datos, setData] = useState([]);
  //console.log("datosdddddd", datos);

  useEffect(() => {
    getMaterias()
      .then((data) => setData(data))
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    getMaterias()
      .then((data) => setSubjects(data.map((d) => d.nombre)))
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    getSemestres()
      .then((data) => setSemesters(data.map((d) => d.nombre)))
      .catch((error) => console.error(error.message));
  }, []);
  //console.log("semestres", semesters);

  const filteredData = datos.filter((d) => {
    const matchesSemester = !filterSemester || d.semestre === filterSemester;
    const matchesSubject = !filterSubject || d.nombre === filterSubject;
    const matchesSearch =
      !searchTerm || d.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSemester && matchesSubject && matchesSearch;
  });

  const filteredSubjects = filterSemester
    ? datos
        .filter((d) => d.semestre === filterSemester)
        .map((d) => d.nombre)
        .filter((value, index, self) => self.indexOf(value) === index) // elimina duplicados
    : subjects;
  useEffect(() => {
    setFilterSubject(""); // limpia la materia si cambia el semestre
  }, [filterSemester]);
  //console.log("Autenticado:", isAuthenticated, "Usuario:", user);

  return (
    <>
      {isAuthenticated && (
        <UserProfileSidebar user={user} onUpdateUser={onUpdateUser} />
      )}
      <div
        className={`content ${!isAuthenticated ? "content-centered-feed" : ""}`}
      >
        <motion.div
          //className="card upload-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

          {/* <SearchFilter
        subjects={subjects}
        semesters={semesters}
        setSelectedSubject={setSelectedSubject}
        setSelectedSemester={setSelectedSemester}
        setFilterSemester={setFilterSemester}
      /> */}
          {filteredData && filteredData.length ? (
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

          {/* {datos && datos.length ? (
        datos.map((d) => (
          <Card
            id_semestre={d.semestre_id}
            nombre_materia={d.nombre}
            nombre_semestre={d.semestre}
            
          />
        ))
      ) : (
        <p>No hay datos</p>
      )} */}
        </motion.div>
      </div>
    </>
  );
}

export default Home;
