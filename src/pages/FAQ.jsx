import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { getFaqs } from '../services/services_generales';

// Misma paleta de colores azul noche
const colors = {
  background: '#0F172A',     // Azul noche oscuro
  cardBg: '#1E293B',         // Fondo de tarjetas
  title: '#38BDF8',          // Azul claro para títulos
  text: '#E2E8F0',           // Texto principal
  textSecondary: '#94A3B8',  // Texto secundario
  accent: '#7DD3FC',         // Celeste para bordes/accent
  icon: '#60A5FA',           // Color de iconos
  highlight: '#0369A1'       // Azul más intenso para destacados
};

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(data || []);
      } catch (error) {
        console.error("Error al obtener FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: colors.background,
        padding: '2rem',
        minHeight: '100vh'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2.5rem',
        maxWidth: '800px',
        margin: '0 auto',
        borderBottom: `2px solid ${colors.accent}30`,
        paddingBottom: '1rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: colors.title,
          margin: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>Preguntas Frecuentes</h2>
        <HelpCircle size={28} color={colors.icon} />
      </div>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {faqs.map((faq) => (
          <motion.div 
            key={faq.id}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ delay: faq.id * 0.05 }}
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: '0.5rem',
              overflow: 'hidden',
              border: `1px solid ${colors.accent}30`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <motion.button
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: faq.destacado ? `${colors.highlight}30` : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
              whileHover={{ backgroundColor: `${colors.accent}15` }}
            >
              <h3 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600',
                color: colors.text,
                textAlign: 'left'
              }}>
                {faq.pregunta}
                {faq.destacado && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: colors.highlight,
                    color: colors.text,
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    Destacado
                  </span>
                )}
              </h3>
              {openQuestion === faq.id ? 
                <ChevronUp size={20} color={colors.icon} /> : 
                <ChevronDown size={20} color={colors.icon} />}
            </motion.button>
            
            <AnimatePresence>
              {openQuestion === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    padding: '0 1.5rem',
                    backgroundColor: `${colors.accent}10`,
                    borderTop: `1px solid ${colors.accent}20`
                  }}
                >
                  <div style={{
                    padding: '1.25rem 0',
                    color: colors.textSecondary,
                    lineHeight: '1.7'
                  }}>
                    {faq.respuesta.split('\n').map((line, index) => (
                      <p key={index} style={{ margin: index > 0 ? '0.75rem 0 0' : '0' }}>
                        {line || '\u00A0'}
                      </p> 
                    ))}
                  </div>
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









// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
// import { getFaqs } from '../services/services_generales';

// function FAQ() {
//   const [openQuestion, setOpenQuestion] = useState(null);

//   const [faqs, setFaqs] = useState([]);
//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const data = await getFaqs();
//         console.log(data);
//         setFaqs(data);
//       } catch (error) {
//         console.error("Error al obtener eventos:", error);
//       }
//     };

//     fetchFaqs();
//   }, []);
//   //console.log(faqs);

//   return (
//     <motion.div 
//       className="content-full-width" 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="faq-header">
//         <h2>Preguntas Frecuentes</h2>
//         <HelpCircle size={24} />
//       </div>
      
//       <div className="faq-container">
//         {faqs.map((faq) => (
//           <motion.div 
//             key={faq.id}
//             className="card faq-card" 
//             initial={{ opacity: 0, y: 10 }} 
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.01 }}
//             transition={{ delay: faq.id * 0.05 }} 
//           >
//             <button
//               className="faq-question"
//               onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
//             >
//               <h3>{faq.pregunta}</h3>
//               {openQuestion === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             </button>
            
//             <AnimatePresence>
//               {openQuestion === faq.id && (
//                 <motion.div
//                   className="faq-answer"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3, ease: "easeInOut" }} 
//                 >
//                   {/* Preserve line breaks from the answer string */}
//                   {faq.respuesta.split('\n').map((line, index) => (
//                     <p key={index}>{line || '\u00A0'}</p> 
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default FAQ;
