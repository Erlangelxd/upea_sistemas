function CreateAnnouncementForm() {
    const { toast } = useToast();
  
    const [form, setForm] = useState({
      titulo: "",
      contenido: "",
      prioridad: "normal", // opciones: baja, normal, alta
      fecha_publicacion: "",
      hora_publicacion: "",
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:8000/anuncios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        if (!response.ok) throw new Error("Error al crear anuncio");
  
        toast({
          title: "Éxito",
          description: "Anuncio creado correctamente",
        });
  
        setForm({
          titulo: "",
          contenido: "",
          prioridad: "normal",
          fecha_publicacion: "",
          hora_publicacion: "",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="form-input"
          type="text"
          name="titulo"
          placeholder="Título del anuncio"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-input"
          name="contenido"
          placeholder="Contenido del anuncio"
          value={form.contenido}
          onChange={handleChange}
          required
        />
        <select
          className="form-select"
          name="prioridad"
          value={form.prioridad}
          onChange={handleChange}
        >
          <option value="baja">Baja</option>
          <option value="normal">Normal</option>
          <option value="alta">Alta</option>
        </select>
        <input
          className="form-input"
          type="date"
          name="fecha_publicacion"
          value={form.fecha_publicacion}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="time"
          name="hora_publicacion"
          value={form.hora_publicacion}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Crear Anuncio</button>
      </form>
    );
  }
  
  export default CreateAnnouncementForm;