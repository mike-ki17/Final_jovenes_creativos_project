import { useState, useEffect } from 'react';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import { favoritesAPI } from '../services/favorites';
import TarjetaJuego from './TarjetaJuego';

const Favoritos = ({ juegos = [] }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavoritos();
  }, []);

  const loadFavoritos = async () => {
    try {
      setLoading(true);
      setError(null);
      const favoritosData = await favoritesAPI.getAll();
      setFavoritos(favoritosData);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (gameId) => {
    try {
      await favoritesAPI.remove(gameId);
      setFavoritos(prev => prev.filter(j => j._id !== gameId));
    } catch (error) {
      alert('Error al remover de favoritos: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Cargando favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="btn-primary" onClick={loadFavoritos}>
          Reintentar
        </button>
      </div>
    );
  }

  if (favoritos.length === 0) {
    return (
      <div className="empty-state">
        <FaHeart style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }} />
        <h2>No tienes juegos favoritos</h2>
        <p>Agrega juegos a tus favoritos desde la biblioteca para verlos aquí.</p>
      </div>
    );
  }

  return (
    <div className="biblioteca-container">
      <div className="biblioteca-header">
        <h2>
          <FaHeart style={{ marginRight: '0.5rem', color: '#e74c3c' }} />
          Mis Favoritos ({favoritos.length})
        </h2>
      </div>

      <div className="biblioteca-grid">
        {favoritos.map((juego) => (
          <div key={juego._id} style={{ position: 'relative' }}>
            <TarjetaJuego
              juego={juego}
              onEdit={() => {}}
              onDelete={() => handleRemoveFavorite(juego._id)}
              onToggleCompletado={() => {}}
              reviews={[]}
            />
            <button
              onClick={() => handleRemoveFavorite(juego._id)}
              className="btn-icon btn-favorite active"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10,
                background: 'rgba(231, 76, 60, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Remover de favoritos"
            >
              <FaHeart />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritos;

