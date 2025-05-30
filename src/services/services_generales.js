const API_URL = "http://localhost:8000"; // Cambia esto según tu backend

export async function getMaterias() {
  const response = await fetch(`${API_URL}/materias/obtener`);

  if (!response.ok) {
    throw new Error("Error al obtener las materias");
  }

  return await response.json();
}

export async function getSemestres() {
  const response = await fetch(`${API_URL}/semestres/obtener`);

  if (!response.ok) {
    throw new Error("Error al obtener los semestres");
  }

  return await response.json();
}

export async function getEventos() {
  const response = await fetch(`${API_URL}/eventos/obtener`);

  if (!response.ok) {
    throw new Error("Error al obtener los eventos");
  }

  return await response.json();
  
}

export async function getAnuncios() {
  const response = await fetch(`${API_URL}/anuncios/obtener`);

  if (!response.ok) {
    throw new Error("Error al obtener los anuncios");
  }

  return await response.json();
  
}

export async function getFaqs() {
  const response = await fetch(`${API_URL}/preguntas_frecuentes/obtener`);

  if (!response.ok) {
    throw new Error("Error al obtener las preguntas frecuentes");
  }

  return await response.json(); 
}