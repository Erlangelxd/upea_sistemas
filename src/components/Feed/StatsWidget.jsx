
import React from 'react';

function StatsWidget({ postCount, subjectCount }) {
  return (
    <aside className="widget">
      <h3>Estadísticas</h3>
      <div className="card">
        <p>Archivos compartidos: {postCount}</p>
        <p>Materias activas: {subjectCount}</p>
      </div>
    </aside>
  );
}

export default StatsWidget;
