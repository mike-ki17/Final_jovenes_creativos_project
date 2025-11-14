import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar, FaClock, FaGamepad } from 'react-icons/fa';
import FormularioReseña from './FormularioReseña';
import { reviewsAPI } from '../services/api';

const ListaReseñas = ({ reseñas, juegos, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [reseñaEditando, setReseñaEditando] = useState(null);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [reseñasFiltradas, setReseñasFiltradas] = useState(reseñas);

  useEffect(() => {
    setReseñasFiltradas(reseñas);
  }, [reseñas]);

  const handleNuevaReseña = () => {
    setReseñaEditando(null);
    setJuegoSeleccionado(null);
    setShowForm(true);
  };

  const handleEditar = (reseña) => {
    setReseñaEditando(reseña);
    setJuegoSeleccionado(null);
    setShowForm(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await reviewsAPI.delete(id);
        onRefresh();
      } catch (error) {
        alert('Error al eliminar la reseña: ' + error.message);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (reseñaEditando) {
        await reviewsAPI.update(reseñaEditando._id, formData);
      } else {
        await reviewsAPI.create(formData);
      }
      setShowForm(false);
      setReseñaEditando(null);
      onRefresh();
    } catch (error) {
      alert('Error al guardar la reseña: ' + error.message);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="lista-resenas-container">
      <div className="lista-resenas-header">
        <h2>
          <FaGamepad /> Mis Reseñas
        </h2>
        <button className="btn-primary" onClick={handleNuevaReseña}>
          <FaPlus /> Nueva Reseña
        </button>
      </div>

      {reseñasFiltradas.length === 0 ? (
        <div className="empty-state">
          <FaGamepad className="empty-icon" />
          <p>No tienes reseñas aún. ¡Crea tu primera reseña!</p>
        </div>
      ) : (
        <div className="reseñas-grid">
          {reseñasFiltradas.map((reseña) => {
            const juego = juegos.find(j => j._id === (reseña.juegoId?._id || reseña.juegoId));
            return (
              <div key={reseña._id} className="reseña-card">
                <div className="reseña-card-header">
                  {juego && (
                    <div className="reseña-juego-info">
                      <img 
                        src={juego.imagenPortada} 
                        alt={juego.titulo}
                        className="reseña-juego-imagen"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x80/1a1a2e/ffffff?text=No+Img';
                        }}
                      />
                      <div>
                        <h3>{juego.titulo}</h3>
                        <span className="reseña-juego-plataforma">{juego.plataforma}</span>
                      </div>
                    </div>
                  )}
                  <div className="reseña-acciones">
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => handleEditar(reseña)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => handleEliminar(reseña._id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="reseña-card-body">
                  <div className="reseña-puntuacion">
                    {renderStars(reseña.puntuacion)}
                    <span className="reseña-puntuacion-numero">{reseña.puntuacion}/5</span>
                  </div>

                  {reseña.horasJugadas > 0 && (
                    <div className="reseña-meta">
                      <FaClock /> {reseña.horasJugadas} horas jugadas
                    </div>
                  )}

                  {reseña.dificultad && (
                    <div className="reseña-meta">
                      Dificultad: {reseña.dificultad}
                    </div>
                  )}

                  {reseña.textoReseña && (
                    <p className="reseña-texto">{reseña.textoReseña}</p>
                  )}

                  <div className="reseña-footer">
                    {reseña.recomendaria ? (
                      <span className="badge badge-success">✓ Recomendado</span>
                    ) : (
                      <span className="badge badge-warning">No recomendado</span>
                    )}
                    <span className="reseña-fecha">
                      {new Date(reseña.fechaCreacion).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <FormularioReseña
          reseña={reseñaEditando}
          juego={juegoSeleccionado}
          juegos={juegos}
          onClose={() => {
            setShowForm(false);
            setReseñaEditando(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ListaReseñas;

