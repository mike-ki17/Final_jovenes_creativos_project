import { FaGamepad, FaCheckCircle, FaClock, FaStar, FaChartLine } from 'react-icons/fa';

const EstadisticasPersonales = ({ juegos, reseñas }) => {
  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(j => j.completado).length;
  const juegosPorCompletar = totalJuegos - juegosCompletados;
  const porcentajeCompletados = totalJuegos > 0 ? ((juegosCompletados / totalJuegos) * 100).toFixed(1) : 0;

  const totalHoras = reseñas.reduce((sum, r) => sum + (r.horasJugadas || 0), 0);
  const promedioHoras = reseñas.length > 0 ? (totalHoras / reseñas.length).toFixed(1) : 0;

  const promedioPuntuacion = reseñas.length > 0
    ? (reseñas.reduce((sum, r) => sum + r.puntuacion, 0) / reseñas.length).toFixed(1)
    : 0;

  const generosCount = {};
  juegos.forEach(juego => {
    generosCount[juego.genero] = (generosCount[juego.genero] || 0) + 1;
  });
  const generoMasComun = Object.keys(generosCount).length > 0
    ? Object.keys(generosCount).reduce((a, b) => generosCount[a] > generosCount[b] ? a : b)
    : 'N/A';

  const plataformasCount = {};
  juegos.forEach(juego => {
    plataformasCount[juego.plataforma] = (plataformasCount[juego.plataforma] || 0) + 1;
  });
  const plataformaMasComun = Object.keys(plataformasCount).length > 0
    ? Object.keys(plataformasCount).reduce((a, b) => plataformasCount[a] > plataformasCount[b] ? a : b)
    : 'N/A';

  const juegosRecomendados = reseñas.filter(r => r.recomendaria).length;
  const porcentajeRecomendados = reseñas.length > 0
    ? ((juegosRecomendados / reseñas.length) * 100).toFixed(1)
    : 0;

  const stats = [
    {
      icon: <FaGamepad />,
      label: 'Total de Juegos',
      value: totalJuegos,
      color: 'primary'
    },
    {
      icon: <FaCheckCircle />,
      label: 'Completados',
      value: juegosCompletados,
      color: 'success',
      subValue: `${porcentajeCompletados}%`
    },
    {
      icon: <FaClock />,
      label: 'Horas Totales',
      value: totalHoras.toFixed(0),
      color: 'info',
      subValue: `Promedio: ${promedioHoras}h`
    },
    {
      icon: <FaStar />,
      label: 'Puntuación Promedio',
      value: promedioPuntuacion,
      color: 'warning',
      subValue: '/ 5.0'
    },
    {
      icon: <FaChartLine />,
      label: 'Reseñas Escritas',
      value: reseñas.length,
      color: 'secondary'
    },
    {
      icon: <FaCheckCircle />,
      label: 'Recomendados',
      value: juegosRecomendados,
      color: 'success',
      subValue: `${porcentajeRecomendados}%`
    }
  ];

  return (
    <div className="estadisticas-container">
      <div className="estadisticas-header">
        <h2>
          <FaChartLine /> Estadísticas Personales
        </h2>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">
                {stat.value}
                {stat.subValue && <span className="stat-subvalue">{stat.subValue}</span>}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-details">
        <div className="stats-section">
          <h3>Género Favorito</h3>
          <div className="stat-detail-value">{generoMasComun}</div>
          <div className="stat-detail-sub">
            {generosCount[generoMasComun] || 0} {generosCount[generoMasComun] === 1 ? 'juego' : 'juegos'}
          </div>
        </div>

        <div className="stats-section">
          <h3>Plataforma Principal</h3>
          <div className="stat-detail-value">{plataformaMasComun}</div>
          <div className="stat-detail-sub">
            {plataformasCount[plataformaMasComun] || 0} {plataformasCount[plataformaMasComun] === 1 ? 'juego' : 'juegos'}
          </div>
        </div>

        <div className="stats-section">
          <h3>Progreso</h3>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${porcentajeCompletados}%` }}
              />
            </div>
            <div className="progress-text">
              {juegosCompletados} de {totalJuegos} juegos completados
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPersonales;

