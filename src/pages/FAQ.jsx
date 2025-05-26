
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "¿Cómo actualizo mi semestre?",
      answer: "Para actualizar tu semestre, sigue estos pasos:\n1. Ve a tu perfil\n2. Haz clic en 'Editar Información'\n3. Selecciona tu nuevo semestre\n4. Guarda los cambios"
    },
    {
      id: 2,
      question: "¿Cómo comparto archivos?",
      answer: "Puedes compartir archivos PDF o imágenes desde la sección principal:\n1. Haz clic en 'Publicar'\n2. Selecciona 'Subir Archivo'\n3. Elige el archivo de tu dispositivo\n4. Añade una descripción\n5. Comparte con tus compañeros"
    },
    {
      id: 3,
      question: "¿Cómo me uno a un chat?",
      answer: "Para unirte a un chat:\n1. Ve a la sección de chat\n2. Selecciona tu semestre actual\n3. Automáticamente te unirás a la sala correspondiente\n4. ¡Comienza a interactuar con tus compañeros!"
    },
    {
      id: 4,
      question: "¿Cómo reporto un problema técnico?",
      answer: "Si encuentras algún problema técnico:\n1. Ve a la sección de Soporte\n2. Haz clic en 'Reportar Problema'\n3. Describe el inconveniente\n4. Adjunta capturas de pantalla si es necesario\n5. Envía el reporte"
    }
  ];

  return (
    // Use content-full-width for components that should span the grid when sidebar/widget are hidden
    <motion.div 
      className="content-full-width" // Apply the full width class
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="faq-header">
        <h2>Preguntas Frecuentes</h2>
        <HelpCircle size={24} />
      </div>
      
      <div className="faq-container">
        {faqs.map((faq) => (
          <motion.div 
            key={faq.id}
            className="card faq-card" // Keep card for styling, but layout handled by container
            initial={{ opacity: 0, y: 10 }} // Subtle entry animation
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ delay: faq.id * 0.05 }} // Stagger animation
          >
            <button
              className="faq-question"
              onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
            >
              <h3>{faq.question}</h3>
              {openQuestion === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            <AnimatePresence>
              {openQuestion === faq.id && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Smoother transition
                >
                  {/* Preserve line breaks from the answer string */}
                  {faq.answer.split('\n').map((line, index) => (
                    <p key={index}>{line || '\u00A0'}</p> // Use non-breaking space for empty lines
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default FAQ;
