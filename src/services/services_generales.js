// const API_URL = "http://localhost:8000"; // Cambia esto según tu backend
const API_URL = "https://codigo-backend.onrender.com"; // Cambia esto según tu backend

// Funciones básicas de fetch con manejo de errores mejorado
async function fetchData(endpoint, errorMessage) {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorMessage);
  }
  return await response.json();
}

// Funciones existentes (versión mejorada)
export async function getMaterias() {
  return fetchData('/materias/obtener', "Error al obtener las materias");
}

export async function getSemestres() {
  return fetchData('/semestres/obtener', "Error al obtener los semestres");
}

export async function getEventos() {
  return fetchData('/eventos/obtener', "Error al obtener los eventos");
}

export async function getAnuncios() {
  return fetchData('/anuncios/obtener', "Error al obtener los anuncios");
}

export async function getFaqs() {
  return fetchData('/preguntas_frecuentes/obtener', "Error al obtener las preguntas frecuentes");
}

// Nuevo método unificado para obtener contenidos académicos
export async function getAcademicContents(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value != null && value !== '') {
        params.append(key, value);
      }
    });

    const response = await fetch(`${API_URL}/contenidos/academicos?${params}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al obtener contenidos académicos");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching academic contents:", error);
    throw error;
  }
}

// Funciones específicas de documentos
export async function getDocumentsBySubject(subjectId) {
  if (!subjectId) throw new Error("ID de materia no proporcionado");
  return fetchData(`/documentos/materia/${subjectId}`, "Error al obtener documentos");
}

export async function getFilteredDocuments({ semesterId, subjectId, searchTerm }) {
  const params = new URLSearchParams();
  if (semesterId) params.append('semestre_id', semesterId);
  if (subjectId) params.append('materia_id', subjectId);
  if (searchTerm) params.append('termino_busqueda', searchTerm);

  return fetchData(`/documentos/filtrados?${params}`, "Error al filtrar documentos");
}

export async function uploadDocument({ files, description, subjectId, userId, typeId = 1 }) {
  const formData = new FormData();
  
  files.forEach(file => formData.append('files', file));
  formData.append('description', description);
  formData.append('subject_id', subjectId);
  formData.append('user_id', userId);
  formData.append('type_id', typeId);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al subir documentos");
  }
  return await response.json();
}

export async function registerDownload(contentId) {
  const response = await fetch(`${API_URL}/documentos/${contentId}/descargar`, {
    method: 'POST'
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al registrar descarga");
  }
  return await response.json();
}

export async function downloadDocument(filePath, fileName) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al descargar el archivo");
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'documento';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error en downloadDocument:", error);
    throw error;
  }
}


// //const API_URL = "https://codigo-backend.onrender.com"; // Cambia esto según tu backend
// const API_URL = "http://localhost:8000"; // Cambia esto según tu backend

// export async function getMaterias() {
//   const response = await fetch(`${API_URL}/materias/obtener`);

//   if (!response.ok) {
//     throw new Error("Error al obtener las materias");
//   }

//   return await response.json();
// }

// export async function getSemestres() {
//   const response = await fetch(`${API_URL}/semestres/obtener`);

//   if (!response.ok) {
//     throw new Error("Error al obtener los semestres");
//   }
  
//   return await response.json();
// }

// export async function getEventos() {
//   const response = await fetch(`${API_URL}/eventos/obtener`);

//   if (!response.ok) {
//     throw new Error("Error al obtener los eventos");
//   }

//   return await response.json();
  
// }

// export async function getAnuncios() {
//   const response = await fetch(`${API_URL}/anuncios/obtener`);

//   if (!response.ok) {
//     throw new Error("Error al obtener los anuncios");
//   }

//   return await response.json();
  
// }

// export async function getFaqs() {
//   const response = await fetch(`${API_URL}/preguntas_frecuentes/obtener`);

//   if (!response.ok) {
//     throw new Error("Error al obtener las preguntas frecuentes");
//   }

//   return await response.json(); 
// }