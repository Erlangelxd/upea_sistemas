
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

function SearchFilter({ 
  searchTerm, 
  setSearchTerm, 
  filterSemester, 
  setFilterSemester, 
  filterSubject, 
  setFilterSubject, 
  semesters, 
  subjects 
}) {
  return (
    <motion.div
      className="card search-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="search-header">
        <div className="search-input-container">
          <Search size={20} className="text-gray-400"/>
          <input
            type="text"
            className="form-input search-input"
            placeholder="Buscar contenido por título o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            className="form-input"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
          >
            <option value="">Todos los semestres</option>
            {semesters.map(sem => (
              <option key={sem} value={sem}>Semestre {sem}</option>
            ))}
          </select>

          <select
            className="form-input"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="">Todas las materias</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchFilter;
