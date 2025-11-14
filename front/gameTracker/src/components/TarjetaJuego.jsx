import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaClock, FaHeart } from 'react-icons/fa';
import { gamesAPI } from '../services/api';
import { favoritesAPI } from '../services/favorites';
import { useAuth } from '../contexts/AuthContext';

const TarjetaJuego = ({ juego, onEdit, onDelete, onToggleCompletado, reviews = [], showFavoriteButton = true }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  useEffect(() => {
    if (isAuthenticated && showFavoriteButton) {
      checkFavorite();
    }
  }, [isAuthenticated, juego._id, showFavoriteButton]);

  const checkFavorite = async () => {
    try {
      const result = await favoritesAPI.check(juego._id);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      // Si no está autenticado, simplemente no mostrar como favorito
      setIsFavorite(false);
    }
  };

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar favoritos');
      return;
    }

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await favoritesAPI.remove(juego._id);
        setIsFavorite(false);
      } else {
        await favoritesAPI.add(juego._id);
        setIsFavorite(true);
      }
    } catch (error) {
      alert('Error al actualizar favoritos: ' + error.message);
    } finally {
      setLoadingFavorite(false);
    }
  };
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
        {isAuthenticated && showFavoriteButton && (
          <button
            className={`btn-icon btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
            disabled={loadingFavorite}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 10,
              background: isFavorite ? 'rgba(231, 76, 60, 0.9)' : 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: loadingFavorite ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
            }}
            title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            <FaHeart />
          </button>
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

