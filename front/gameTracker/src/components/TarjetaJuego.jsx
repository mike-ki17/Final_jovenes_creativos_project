import { FaEdit, FaTrash, FaCheckCircle, FaClock } from 'react-icons/fa';
import { gamesAPI } from '../services/api';

const TarjetaJuego = ({ juego, onEdit, onDelete, onToggleCompletado, reviews = [] }) => {
  const juegoReviews = reviews.filter(r => r.juegoId?._id === juego._id || r.juegoId === juego._id);
  const promedioPuntuacion = juegoReviews.length > 0
    ? (juegoReviews.reduce((sum, r) => sum + r.puntuacion, 0) / juegoReviews.length).toFixed(1)
    : null;

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar "${juego.titulo}"?`)) {
      try {
        await gamesAPI.delete(juego._id);
        onDelete(juego._id);
      } catch (error) {
        alert('Error al eliminar el juego: ' + error.message);
      }
    }
  };

  const handleToggleCompletado = async () => {
    try {
      await gamesAPI.update(juego._id, { completado: !juego.completado });
      onToggleCompletado(juego._id);
    } catch (error) {
      alert('Error al actualizar el juego: ' + error.message);
    }
  };

  return (
    <div className={`tarjeta-juego ${juego.completado ? 'completado' : ''}`}>
      <div className="tarjeta-juego-imagen-container">
        <img 
          src={juego.imagenPortada} 
          alt={juego.titulo}
          className="tarjeta-juego-imagen"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Sin+Imagen';
          }}
        />
        {juego.completado && (
          <div className="tarjeta-juego-badge">
            <FaCheckCircle />
            <span>Completado</span>
          </div>
        )}
      </div>
      
      <div className="tarjeta-juego-content">
        <h3 className="tarjeta-juego-titulo">{juego.titulo}</h3>
        <div className="tarjeta-juego-info">
          <span className="tarjeta-juego-genero">{juego.genero}</span>
          <span className="tarjeta-juego-plataforma">{juego.plataforma}</span>
          <span className="tarjeta-juego-año">{juego.añoLanzamiento}</span>
        </div>
        
        {promedioPuntuacion && (
          <div className="tarjeta-juego-puntuacion">
            <span>⭐ {promedioPuntuacion}</span>
            <span className="tarjeta-juego-resenas-count">
              ({juegoReviews.length} {juegoReviews.length === 1 ? 'reseña' : 'reseñas'})
            </span>
          </div>
        )}

        <p className="tarjeta-juego-descripcion">{juego.descripcion}</p>
        
        <div className="tarjeta-juego-acciones">
          <button 
            className="btn-icon btn-edit"
            onClick={() => onEdit(juego)}
            title="Editar"
          >
            <FaEdit />
          </button>
          <button 
            className={`btn-icon btn-toggle ${juego.completado ? 'completado' : ''}`}
            onClick={handleToggleCompletado}
            title={juego.completado ? 'Marcar como no completado' : 'Marcar como completado'}
          >
            <FaCheckCircle />
          </button>
          <button 
            className="btn-icon btn-delete"
            onClick={handleDelete}
            title="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaJuego;

