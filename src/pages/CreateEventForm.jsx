import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function CreateEventForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha_evento: "",
    hora_inicio: "",
    hora_fin: "",
    lugar: "",
    capacidad: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Error al crear evento");
      toast({ title: "Éxito", description: "Evento creado exitosamente" });
      setForm({ titulo: "", descripcion: "", fecha_evento: "", hora_inicio: "", hora_fin: "", lugar: "", capacidad: 0 });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="form-input" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
      <textarea className="form-input" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
      <input className="form-input" type="date" name="fecha_evento" value={form.fecha_evento} onChange={handleChange} required />
      <input className="form-input" type="time" name="hora_inicio" value={form.hora_inicio} onChange={handleChange} required />
      <input className="form-input" type="time" name="hora_fin" value={form.hora_fin} onChange={handleChange} required />
      <input className="form-input" name="lugar" placeholder="Lugar" value={form.lugar} onChange={handleChange} required />
      <input className="form-input" type="number" name="capacidad" placeholder="Capacidad" value={form.capacidad} onChange={handleChange} required />
      <button type="submit" className="btn btn-primary">Crear Evento</button>
    </form>
  );
}

export default CreateEventForm;