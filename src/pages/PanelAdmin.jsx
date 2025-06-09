import React, { useState } from "react";

function PanelAdmin() {
  const [mensaje, setMensaje] = useState("");

  const [anuncio, setAnuncio] = useState({
    titulo: "",
    contenido: "",
    prioridad: "normal",
  });

  const handleAnuncioChange = (e) =>
    setAnuncio({ ...anuncio, [e.target.name]: e.target.value });

  const enviarAnuncio = async () => {
    try {
      const res = await fetch("http://localhost:8000/anuncios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anuncio),
      });
      if (!res.ok) throw new Error("Error en el servidor");
      setMensaje("✅ Anuncio creado correctamente");
      setAnuncio({ titulo: "", contenido: "", prioridad: "normal" });
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear anuncio");
    }
  };

  const [evento, setEvento] = useState({
    titulo: "",
    descripcion: "",
    lugar: "",
    fecha_evento: "",
    hora_inicio: "",
    hora_fin: "",
    capacidad: 0,
  });

  const handleEventoChange = (e) =>
    setEvento({ ...evento, [e.target.name]: e.target.value });

  const enviarEvento = async () => {
    try {
      const res = await fetch("http://localhost:8000/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
      });
      if (!res.ok) throw new Error("Error en el servidor");
      setMensaje("✅ Evento creado correctamente");
      setEvento({
        titulo: "",
        descripcion: "",
        lugar: "",
        fecha_evento: "",
        hora_inicio: "",
        hora_fin: "",
        capacidad: 0,
      });
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al crear evento");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Administración</h1>

      {/* ---------------- FORM ANUNCIO ---------------- */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">📢 Crear Anuncio</h2>

        <input
          name="titulo"
          value={anuncio.titulo}
          onChange={handleAnuncioChange}
          placeholder="Título"
          className="w-full border px-4 py-2 mb-2 rounded"
        />
        <textarea
          name="contenido"
          value={anuncio.contenido}
          onChange={handleAnuncioChange}
          placeholder="Contenido del anuncio"
          className="w-full border px-4 py-2 mb-2 rounded"
        />
        <select
          name="prioridad"
          value={anuncio.prioridad}
          onChange={handleAnuncioChange}
          className="w-full border px-4 py-2 mb-4 rounded"
        >
          <option value="normal">Normal</option>
          <option value="urgente">Urgente</option>
          <option value="informativo">Informativo</option>
        </select>

        <button
          onClick={enviarAnuncio}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Publicar Anuncio
        </button>
      </div>

      {/* ---------------- FORM EVENTO ---------------- */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📅 Crear Evento</h2>

        <input
          name="titulo"
          value={evento.titulo}
          onChange={handleEventoChange}
          placeholder="Título del evento"
          className="w-full border px-4 py-2 mb-2 rounded"
        />
        <textarea
          name="descripcion"
          value={evento.descripcion}
          onChange={handleEventoChange}
          placeholder="Descripción"
          className="w-full border px-4 py-2 mb-2 rounded"
        />
        <input
          name="lugar"
          value={evento.lugar}
          onChange={handleEventoChange}
          placeholder="Lugar del evento"
          className="w-full border px-4 py-2 mb-2 rounded"
        />
        <input
          name="fecha_evento"
          value={evento.fecha_evento}
          onChange={handleEventoChange}
          type="date"
          className="w-full border px-4 py-2 mb-2 rounded"
        />
        <div className="flex gap-2 mb-2">
          <input
            name="hora_inicio"
            value={evento.hora_inicio}
            onChange={handleEventoChange}
            type="time"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="hora_fin"
            value={evento.hora_fin}
            onChange={handleEventoChange}
            type="time"
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <input
          name="capacidad"
          value={evento.capacidad}
          onChange={handleEventoChange}
          type="number"
          placeholder="Capacidad"
          className="w-full border px-4 py-2 mb-4 rounded"
        />

        <button
          onClick={enviarEvento}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Publicar Evento
        </button>
      </div>

      {/* ---------------- MENSAJE ---------------- */}
      {mensaje && <p className="mt-6 text-center font-semibold">{mensaje}</p>}
    </div>
  );
}

export default PanelAdmin;
