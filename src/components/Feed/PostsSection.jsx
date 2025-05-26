
import React, { useState } from 'react';
import UploadForm from '@/components/Feed/UploadForm';
import SearchFilter from '@/components/Feed/SearchFilter';
import PostCard from '@/components/Feed/PostCard';

// Mock Data (Should ideally come from props or context)
const mockPosts = [
  { id: 1, user: 'Ana García', semester: 3, subject: 'Cálculo II', content: 'Apuntes sobre límites y derivadas.', fileUrl: '#', timestamp: 'Hace 2 horas', avatarUrl: 'https://images.unsplash.com/photo-1529688499411-352050c5a72f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4OTg2ODMzMw&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 2, user: 'Luis Pérez', semester: 5, subject: 'Bases de Datos', content: 'Diagrama ER para el proyecto final.', fileUrl: '#', timestamp: 'Hace 1 día', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4OTg2ODQxMg&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 3, user: 'Sofía Ramírez', semester: 3, subject: 'Programación I', content: 'Ejercicios resueltos de estructuras de control.', fileUrl: '#', timestamp: 'Hace 3 días', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4OTg2ODQ1MQ&ixlib=rb-4.0.3&q=80&w=1080' },
];


function PostsSection({ isAuthenticated, user, subjects, semesters }) {
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/materias/obtener');
        const data = await response.json();
        setPosts(data);

        data.materias.map((materia) => subjects.push(materia.name));
        
        console.log(subjects);
      } catch (error) {

        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleUpload = (newPostData) => {
    const newPost = { 
      id: Date.now(), 
      user: user.name, // Use logged-in user's name
      avatarUrl: user.avatarUrl, // Use logged-in user's avatar
      timestamp: 'Ahora mismo', 
      ...newPostData 
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts); 
  };

  const handleSearch = ({ searchTerm, semester, subject }) => {
    let results = posts;
    if (searchTerm) {
      results = results.filter(post => 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (semester) {
      results = results.filter(post => post.semester === parseInt(semester));
    }
    if (subject) {
      results = results.filter(post => post.subject.toLowerCase() === subject.toLowerCase());
    }
    setFilteredPosts(results);
  };

  return (
    <div>
      {isAuthenticated && <UploadForm onUpload={handleUpload} subjects={subjects} semesters={semesters} />}
      
      <SearchFilter onSearch={handleSearch} subjects={subjects} semesters={semesters} />
      
      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p>No se encontraron publicaciones que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
}

export default PostsSection;
