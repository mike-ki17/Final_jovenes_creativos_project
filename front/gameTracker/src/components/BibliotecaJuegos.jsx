import { useState, useEffect } from 'react';
import { FaPlus, FaGamepad } from 'react-icons/fa';
import TarjetaJuego from './TarjetaJuego';
import FormularioJuego from './FormularioJuego';
import Buscador from './Buscador';
import Filtros from './Filtros';
import { gamesAPI } from '../services/api';

const BibliotecaJuegos = ({ juegos, reseñas, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroPlataforma, setFiltroPlataforma] = useState('');
  const [filtroCompletado, setFiltroCompletado] = useState('');
  const [juegosFiltrados, setJuegosFiltrados] = useState(juegos);

  // Obtener valores únicos para los filtros
  const generosDisponibles = [...new Set(juegos.map(j => j.genero))].sort();
  const plataformasDisponibles = [...new Set(juegos.map(j => j.plataforma))].sort();

  useEffect(() => {
    let filtered = [...juegos];

    // Filtro de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(juego =>
        juego.titulo.toLowerCase().includes(term) ||
        juego.desarrollador.toLowerCase().includes(term) ||
        juego.descripcion.toLowerCase().includes(term)
      );
    }

    // Filtro por género
    if (filtroGenero) {
      filtered = filtered.filter(juego => juego.genero === filtroGenero);
    }

    // Filtro por plataforma
    if (filtroPlataforma) {
      filtered = filtered.filter(juego => juego.plataforma === filtroPlataforma);
    }

    // Filtro por completado
    if (filtroCompletado !== '') {
      const completado = filtroCompletado === 'true';
      filtered = filtered.filter(juego => juego.completado === completado);
    }

    setJuegosFiltrados(filtered);
  }, [juegos, searchTerm, filtroGenero, filtroPlataforma, filtroCompletado]);

  const handleNuevoJuego = () => {
    setJuegoEditando(null);
    setShowForm(true);
  };

  const handleEditar = (juego) => {
    setJuegoEditando(juego);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (juegoEditando) {
        await gamesAPI.update(juegoEditando._id, formData);
      } else {
        await gamesAPI.create(formData);
      }
      setShowForm(false);
      setJuegoEditando(null);
      onRefresh();
    } catch (error) {
      alert('Error al guardar el juego: ' + error.message);
    }
  };

  const handleDelete = () => {
    onRefresh();
  };

  const handleToggleCompletado = () => {
    onRefresh();
  };

  return (
    <div className="biblioteca-container">
      <div className="biblioteca-header">
        <h2>
          <FaGamepad /> Mi Biblioteca de Juegos
        </h2>
        <button className="btn-primary" onClick={handleNuevoJuego}>
          <FaPlus /> Agregar Juego
        </button>
      </div>

      <div className="biblioteca-controls">
        <Buscador
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Buscar por título, desarrollador o descripción..."
        />
        <Filtros
          genero={filtroGenero}
          plataforma={filtroPlataforma}
          completado={filtroCompletado}
          onGeneroChange={setFiltroGenero}
          onPlataformaChange={setFiltroPlataforma}
          onCompletadoChange={setFiltroCompletado}
          generosDisponibles={generosDisponibles}
          plataformasDisponibles={plataformasDisponibles}
        />
      </div>

      <div className="biblioteca-stats-bar">
        <span>Mostrando {juegosFiltrados.length} de {juegos.length} juegos</span>
      </div>

      {juegosFiltrados.length === 0 ? (
        <div className="empty-state">
          <FaGamepad className="empty-icon" />
          <p>
            {juegos.length === 0
              ? 'Tu biblioteca está vacía. ¡Agrega tu primer juego!'
              : 'No se encontraron juegos con los filtros seleccionados.'}
          </p>
        </div>
      ) : (
        <div className="biblioteca-grid">
          {juegosFiltrados.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              reseñas={reseñas}
              onEdit={handleEditar}
              onDelete={handleDelete}
              onToggleCompletado={handleToggleCompletado}
            />
          ))}
        </div>
      )}

      {showForm && (
        <FormularioJuego
          juego={juegoEditando}
          onClose={() => {
            setShowForm(false);
            setJuegoEditando(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default BibliotecaJuegos;

