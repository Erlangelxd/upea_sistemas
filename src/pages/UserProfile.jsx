import React, { useState } from "react";
import { Edit3, Save, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function UserProfileSidebar({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });
  const { toast } = useToast();

  const handleEditToggle = () => {
    setIsEditing((prev) => {
      if (prev) setEditableUser({ ...user }); // reset if canceling
      return !prev;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: name === "semester" ? parseInt(value) || "" : value,
    }));
  };

  const handleSave = () => {
    onUpdateUser(editableUser);
    setIsEditing(false);
    toast({
      title: "Perfil Actualizado",
      description: "Tus datos han sido guardados.",
    });
  };

  return (
    <aside className="sidebar">
      <h3>Perfil</h3>
      <div className="card">
        <div className="profile-image-container">
          <img
            alt="Avatar"
            className="profile-image"
            src="https://cdn-icons-png.flaticon.com/512/6073/6073873.png"
          />
        </div>

        <div className="user-info-content">
          {isEditing ? (
            <div className="form-fields">
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={editableUser.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Carrera</label>
                <input
                  type="text"
                  name="career"
                  className="form-input"
                  value={editableUser.career}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Semestre</label>
                <input
                  type="number"
                  name="semester"
                  className="form-input"
                  value={editableUser.semester}
                  onChange={handleChange}
                  min="1"
                  max="12"
                />
              </div>
              <div className="edit-buttons">
                <button
                  onClick={handleSave}
                  className="btn btn-primary btn-sm"
                >
                  <Save size={16} /> Guardar
                </button>
                <button
                  onClick={handleEditToggle}
                  className="btn btn-secondary btn-sm"
                >
                  <XCircle size={16} /> Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="user-details">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Carrera:</strong> {user.career}</p>
              <p><strong>Semestre:</strong> {user.semester}</p>
              <button
                onClick={handleEditToggle}
                className="btn btn-primary btn-sm"
              >
                <Edit3 size={16} /> Editar Perfil
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default UserProfileSidebar;
