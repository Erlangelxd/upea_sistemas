
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function UserProfileSidebar({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });
  const { toast } = useToast();

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset changes if canceling
      setEditableUser({ ...user });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser(prev => ({
      ...prev,
      [name]: name === 'semester' ? parseInt(value) || '' : value // Ensure semester is number
    }));
  };

  const handleSave = () => {
    onUpdateUser(editableUser); // Pass updated data to parent
    setIsEditing(false);
    toast({
      title: "Perfil Actualizado",
      description: "Tus datos han sido guardados.",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableUser(prev => ({ ...prev, avatarUrl: reader.result }));
        // In a real app, you'd upload the file here and get back a URL
        // For now, we just use the base64 preview
        onUpdateUser({ avatarUrl: reader.result }); // Update immediately for preview
         toast({
           title: "Imagen Actualizada (Simulado)",
           description: "La nueva imagen se muestra, pero no se ha subido permanentemente.",
         });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <aside className="sidebar">
      <h3>Perfil</h3>
      <div className="card">
        <div className="profile-image-container">
          <img alt="Profile avatar" className="profile-image" src={editableUser.avatarUrl} />
          {isEditing && (
             <label htmlFor="profile-upload" className="profile-image-upload cursor-pointer">
               Cambiar foto
             </label>
          )}
          <input 
            id="profile-upload" 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageChange}
            disabled={!isEditing}
            style={{ display: 'none' }} // Ensure it's visually hidden
          />
        </div>

        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
              <motion.button 
                onClick={handleSave} 
                className="btn btn-primary btn-sm"
                whileTap={{ scale: 0.95 }}
              >
                <Save size={16} /> Guardar
              </motion.button>
              <motion.button 
                onClick={handleEditToggle} 
                className="btn btn-secondary btn-sm"
                whileTap={{ scale: 0.95 }}
              >
                 <XCircle size={16} /> Cancelar
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="user-detail"><strong>Nombre:</strong> {user.name}</p>
            <p className="user-detail"><strong>Carrera:</strong> {user.career}</p>
            <p className="user-detail"><strong>Semestre:</strong> {user.semester}</p>
            <motion.button 
              onClick={handleEditToggle} 
              className="btn btn-primary btn-sm edit-profile-btn"
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 size={16} /> Editar Perfil
            </motion.button>
          </motion.div>
        )}
      </div>
    </aside>
  );
}

export default UserProfileSidebar;
