
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Users } from 'lucide-react';

function Chat() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [message, setMessage] = useState('');
  // Example messages - replace with real-time data
  const [messages, setMessages] = useState([]); 
  const messagesEndRef = useRef(null); // Ref for scrolling

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedSemester) {
      const newMessage = {
        id: Date.now(),
        sender: "Tú", // Replace with actual user name
        text: message,
        timestamp: new Date(),
      };
      // Add message to local state (in real app, send to server)
      setMessages(prev => [...prev, newMessage]); 
      setMessage('');
    }
  };

  const selectSemester = (semestre) => {
      setSelectedSemester(semestre);
      // Simulate fetching messages for the selected semester
      setMessages([ 
        { id: 1, sender: "Ana García", text: `¿Alguien tiene los apuntes de la clase de hoy del Semestre ${semestre}?`, timestamp: new Date() },
        { id: 2, sender: "Carlos Ruiz", text: `Sí, yo los tengo. Los comparto en un momento.`, timestamp: new Date() },
        { id: 3, sender: "Laura Martínez", text: `¡Gracias Carlos! ¿Podrías pasarlos por aquí?`, timestamp: new Date() },
        { id: 4, sender: "Tú", text: `Perfecto, los espero.`, timestamp: new Date() },
        { id: 5, sender: "Carlos Ruiz", text: `Listo, archivo adjunto.`, timestamp: new Date() },
        { id: 6, sender: "Ana García", text: `¡Genial! Descargando...`, timestamp: new Date() },
      ]);
  };

  return (
    // Use content-full-width for components that should span the grid when sidebar/widget are hidden
    <motion.div
        className="content-full-width chat-page-container" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
      <h2>Salas de Chat</h2>
      
      <motion.div 
        className="card semester-selector" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="card-header"> 
          <h3>Selecciona tu Semestre</h3>
          <Users size={24} />
        </div>
        
        <div className="semester-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((semestre) => (
            <motion.button
              key={semestre}
              className={`btn ${selectedSemester === semestre ? 'btn-secondary' : 'btn-primary'}`}
              onClick={() => selectSemester(semestre)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Semestre {semestre}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {selectedSemester && (
        <motion.div 
          className="chat-container card" 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="chat-header">
            <h3>Chat Semestre {selectedSemester}</h3>
            {/* Add maybe participant count or other info */}
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
               <motion.div 
                key={msg.id}
                className="chat-message"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <strong>{msg.sender}:</strong>
                <p>{msg.text}</p>
                {/* Add timestamp if needed */}
              </motion.div>
            ))}
             <div ref={messagesEndRef} /> {/* Empty div at the end for scrolling */}
          </div>
          
          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              className="form-input"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <motion.button 
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!message.trim()} // Disable if message is empty
            >
              <Send size={20} />
            </motion.button>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Chat;
