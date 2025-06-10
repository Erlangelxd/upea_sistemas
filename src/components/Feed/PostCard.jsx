import React from "react";
import { motion } from "framer-motion";
import { Book, Calendar, Download } from "lucide-react";

function PostCard({ post, index }) {
  const handleDownload = () => {
    console.log(`Downloading post ${post.id}`);
  };

  return (
    <motion.div
      key={post.id}
      className="card content-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 + 0.2 }} 
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <h4>{post.title}</h4>
        <span className="content-type">{post.type}</span>
      </div>

      <p>{post.description}</p>

      <div className="content-meta">
        <div className="meta-item">
          <Book size={16} />
          <span>{post.subject}</span>
        </div>
        <div className="meta-item">
          <Calendar size={16} />
          <span>Semestre {post.semester}</span>
        </div>
      </div>

      <button onClick={handleDownload} className="btn btn-secondary">
        <Download size={18} />
        Descargar
      </button>
    </motion.div>
  );
}

export default PostCard;
