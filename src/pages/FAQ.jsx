
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { getFaqs } from '../services/services_generales';

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    fetchFaqs();
  }, []);
  //console.log(faqs);

  return (
    <motion.div 
      className="content-full-width" 
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
            key={faq.id_faq}
            className="card faq-card" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ delay: faq.id * 0.05 }} 
          >
            <button
              className="faq-question"
              onClick={() => setOpenQuestion(openQuestion === faq.id_faq ? null : faq.id_faq)}
            >
              <h3>{faq.pregunta}</h3>
              {openQuestion === faq.id_faq ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            <AnimatePresence>
              {openQuestion === faq.id_faq && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }} 
                >
                  {/* Preserve line breaks from the answer string */}
                  {faq.respuesta.split('\n').map((line, index) => (
                    <p key={index}>{line || '\u00A0'}</p> 
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
