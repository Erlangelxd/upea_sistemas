
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function UploadForm({ subjects, semesters, onSubmit }) {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Error",
          description: "El archivo es demasiado grande. Máximo 10MB permitido.",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !selectedSubject || !selectedSemester || !file) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos y sube un archivo",
        variant: "destructive"
      });
      return;
    }

    onSubmit({ content, selectedSubject, selectedSemester, file });

    // Limpiar el formulario
    setContent('');
    setSelectedSubject('');
    setSelectedSemester('');
    setFile(null);
    // Reset file input visually if needed
    const fileInput = document.getElementById('file');
    if(fileInput) fileInput.value = '';
  };

  return (
    <motion.div
      className="card upload-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-header">
        <h3>Compartir Contenido</h3>
        <Upload size={24} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-input"
            placeholder="Describe tu contenido..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <select
              className="form-input"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona la materia</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              className="form-input"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona el semestre</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semestre {sem}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="file-upload">
          <input
            type="file"
            id="file"
            className="file-input"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            required
          />
          <label htmlFor="file" className="file-label">
            <Upload size={20} />
            {file ? file.name : 'Seleccionar archivo'}
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Publicar</button>
      </form>
    </motion.div>
  );
}

export default UploadForm;
