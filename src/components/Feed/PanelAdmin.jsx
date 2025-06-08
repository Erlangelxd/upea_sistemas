import React from "react";
import UploadForm from "./UploadForm";
import Events from "./Events";
import Announcements from "./Announcements";
import CreateEventForm from "./CreateEventForm"; // lo explico abajo
import CreateAnnouncementForm from "./CreateAnnouncementForm"; // lo explico abajo

function PanelAdmin({ subjects, semesters }) {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Panel de Administrador</h1>

      {/* Subida de contenido académico */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Subir Contenido Académico</h2>
        <UploadForm subjects={subjects} semesters={semesters} onSubmit={(data) => {
          // Aquí puedes implementar lógica para enviar datos al backend
          console.log("Contenido subido:", data);
        }} />
      </section>

      {/* Crear nuevo evento */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-2">Crear Nuevo Evento</h2>
        <CreateEventForm />
      </section>

      {/* Crear nuevo anuncio */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-2">Crear Nuevo Anuncio</h2>
        <CreateAnnouncementForm />
      </section>

      {/* Lista de eventos */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-2">Lista de Eventos</h2>
        <Events />
      </section>

      {/* Lista de anuncios */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-2">Lista de Anuncios</h2>
        <Announcements />
      </section>
    </div>
  );
}

export default PanelAdmin;
