import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import SearchFilter from "../components/Feed/SearchFilter";

function Inicio({ subjects, semesters, onSubmit }) {
  const [content, setContent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [file, setFile] = useState(null);

  return (
    <motion.div
      className="card upload-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="filters">
        <select
          className="form-input"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">Todos los semestres</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              Semestre {sem}
            </option>
          ))}
        </select>

        <select
          className="form-input"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Todas las materias</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}

export default Inicio;
