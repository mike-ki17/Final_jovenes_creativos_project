import { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const FormularioJuego = ({ juego, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: new Date().getFullYear(),
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (juego) {
      setFormData({
        titulo: juego.titulo || '',
        genero: juego.genero || '',
        plataforma: juego.plataforma || '',
        añoLanzamiento: juego.añoLanzamiento || new Date().getFullYear(),
        desarrollador: juego.desarrollador || '',
        imagenPortada: juego.imagenPortada || '',
        descripcion: juego.descripcion || '',
        completado: juego.completado || false,
      });
    }
  }, [juego]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
    if (!formData.genero.trim()) newErrors.genero = 'El género es requerido';
    if (!formData.plataforma.trim()) newErrors.plataforma = 'La plataforma es requerida';
    if (!formData.añoLanzamiento || formData.añoLanzamiento < 1970 || formData.añoLanzamiento > new Date().getFullYear() + 5) {
      newErrors.añoLanzamiento = 'Año inválido';
    }
    if (!formData.desarrollador.trim()) newErrors.desarrollador = 'El desarrollador es requerido';
    if (!formData.imagenPortada.trim()) newErrors.imagenPortada = 'La URL de la imagen es requerida';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';

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
          <h2>{juego ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h2>
          <button className="btn-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="formulario-juego">
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={errors.titulo ? 'error' : ''}
            />
            {errors.titulo && <span className="error-message">{errors.titulo}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Género *</label>
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className={errors.genero ? 'error' : ''}
                placeholder="Ej: RPG, Acción, Estrategia"
              />
              {errors.genero && <span className="error-message">{errors.genero}</span>}
            </div>

            <div className="form-group">
              <label>Plataforma *</label>
              <input
                type="text"
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                className={errors.plataforma ? 'error' : ''}
                placeholder="Ej: PC, PlayStation, Xbox"
              />
              {errors.plataforma && <span className="error-message">{errors.plataforma}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Año de Lanzamiento *</label>
              <input
                type="number"
                name="añoLanzamiento"
                value={formData.añoLanzamiento}
                onChange={handleChange}
                className={errors.añoLanzamiento ? 'error' : ''}
                min="1970"
                max={new Date().getFullYear() + 5}
              />
              {errors.añoLanzamiento && <span className="error-message">{errors.añoLanzamiento}</span>}
            </div>

            <div className="form-group">
              <label>Desarrollador *</label>
              <input
                type="text"
                name="desarrollador"
                value={formData.desarrollador}
                onChange={handleChange}
                className={errors.desarrollador ? 'error' : ''}
              />
              {errors.desarrollador && <span className="error-message">{errors.desarrollador}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>URL de Imagen de Portada *</label>
            <input
              type="url"
              name="imagenPortada"
              value={formData.imagenPortada}
              onChange={handleChange}
              className={errors.imagenPortada ? 'error' : ''}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.imagenPortada && <span className="error-message">{errors.imagenPortada}</span>}
            {formData.imagenPortada && (
              <img 
                src={formData.imagenPortada} 
                alt="Preview" 
                className="form-preview-image"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={errors.descripcion ? 'error' : ''}
              rows="4"
            />
            {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="completado"
                checked={formData.completado}
                onChange={handleChange}
              />
              <span>Marcar como completado</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <FaSave /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioJuego;

