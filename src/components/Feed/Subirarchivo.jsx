import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "@/components/ui/use-toast"

const UploadForm = ({ subjects, semesters }) => {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) => file.size <= 20 * 1024 * 1024
    ); // Máximo 20MB por archivo

    if (validFiles.length < selectedFiles.length) {
      toast({
        title: "Alerta",
        description: "Algunos archivos fueron ignorados por exceder los 20MB.",
        variant: "default",
      });
    }

    setFiles(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      files.length === 0 ||
      description.trim() === "" ||
      selectedSubject === "" ||
      selectedSemester === ""
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos y sube un archivo",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Archivos subidos correctamente.",
        });
        setDescription("");
        setFiles([]);
        document.getElementById("file-input").value = "";
      } else {
        const error = await response.text();
        throw new Error(error || "Error desconocido");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <textarea
            className="form-input"
            placeholder="Describe tu contenido..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              <option value="" disabled>
                Selecciona la materia
              </option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
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
              <option value="" disabled>
                Selecciona el semestre
              </option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {" "}
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="file-upload">
          <input
            id="file-input"
            type="file"
            className="file-input"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.rar"
            onChange={handleFileChange}
            required
          />
          <label htmlFor="file-input" className="file-label">
            <Upload size={20} />
            {files.length > 0 ? (
              <div>
                <p className="font-medium mb-1">{files.length} archivo(s) seleccionado(s)</p>
                <div className="bg-gray-50 p-3 rounded-lg border text-sm text-gray-700 mt-2">
                  <ul className="list-disc pl-5">
                    {files.map((file, index) => (
                      <li key={index}>
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <span>Seleccionar archivo</span>
            )}
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Publicar
        </button>


      </form>
    </motion.div>
  );
};

export default UploadForm;
