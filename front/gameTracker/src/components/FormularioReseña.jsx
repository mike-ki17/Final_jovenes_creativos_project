import { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaStar } from 'react-icons/fa';

const FormularioReseña = ({ reseña, juego, juegos = [], onClose, onSave }) => {
  const [formData, setFormData] = useState({
    juegoId: '',
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true,
  });

  const [errors, setErrors] = useState({});
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    if (reseña) {
      setFormData({
        juegoId: reseña.juegoId?._id || reseña.juegoId || '',
        puntuacion: reseña.puntuacion || 5,
        textoReseña: reseña.textoReseña || '',
        horasJugadas: reseña.horasJugadas || 0,
        dificultad: reseña.dificultad || 'Normal',
        recomendaria: reseña.recomendaria !== undefined ? reseña.recomendaria : true,
      });
    } else if (juego) {
      setFormData(prev => ({ ...prev, juegoId: juego._id }));
    }
  }, [reseña, juego]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value)
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, puntuacion: rating }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.juegoId) newErrors.juegoId = 'Debes seleccionar un juego';
    if (!formData.puntuacion || formData.puntuacion < 1 || formData.puntuacion > 5) {
      newErrors.puntuacion = 'La puntuación debe estar entre 1 y 5';
    }
    if (formData.horasJugadas < 0) {
      newErrors.horasJugadas = 'Las horas jugadas no pueden ser negativas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{reseña ? 'Editar Reseña' : 'Nueva Reseña'}</h2>
          <button className="btn-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="formulario-reseña">
          {!reseña && !juego && (
            <div className="form-group">
              <label>Juego *</label>
              <select
                name="juegoId"
                value={formData.juegoId}
                onChange={handleChange}
                className={errors.juegoId ? 'error' : ''}
              >
                <option value="">Selecciona un juego</option>
                {juegos.map((j) => (
                  <option key={j._id} value={j._id}>{j.titulo}</option>
                ))}
              </select>
              {errors.juegoId && <span className="error-message">{errors.juegoId}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Puntuación *</label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star-icon ${star <= (hoveredStar || formData.puntuacion) ? 'active' : ''}`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                />
              ))}
              <span className="star-rating-value">{formData.puntuacion} / 5</span>
            </div>
            {errors.puntuacion && <span className="error-message">{errors.puntuacion}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Horas Jugadas</label>
              <input
                type="number"
                name="horasJugadas"
                value={formData.horasJugadas}
                onChange={handleChange}
                className={errors.horasJugadas ? 'error' : ''}
                min="0"
                step="0.5"
              />
              {errors.horasJugadas && <span className="error-message">{errors.horasJugadas}</span>}
            </div>

            <div className="form-group">
              <label>Dificultad</label>
              <select
                name="dificultad"
                value={formData.dificultad}
                onChange={handleChange}
              >
                <option value="Fácil">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Difícil">Difícil</option>
                <option value="Muy Difícil">Muy Difícil</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Reseña</label>
            <textarea
              name="textoReseña"
              value={formData.textoReseña}
              onChange={handleChange}
              rows="6"
              placeholder="Escribe tu opinión sobre el juego..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="recomendaria"
                checked={formData.recomendaria}
                onChange={handleChange}
              />
              <span>¿Recomendarías este juego?</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <FaSave /> Guardar Reseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioReseña;

