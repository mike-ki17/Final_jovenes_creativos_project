import { useState, useEffect } from 'react';
import { FaGamepad, FaStar, FaChartLine, FaSpinner } from 'react-icons/fa';
import BibliotecaJuegos from './components/BibliotecaJuegos';
import ListaReseñas from './components/ListaReseñas';
import EstadisticasPersonales from './components/EstadisticasPersonales';
import { gamesAPI, reviewsAPI } from './services/api';
import './App.css';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('biblioteca');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [gamesData, reviewsData] = await Promise.all([
        gamesAPI.getAll(),
        reviewsAPI.getAll()
      ]);
      setJuegos(gamesData);
      setReseñas(reviewsData);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Error al cargar los datos. Asegúrate de que el servidor esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Cargando tu biblioteca...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="btn-primary" onClick={loadData}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <FaGamepad className="logo-icon" />
            <h1>GameTracker</h1>
          </div>
          <p className="tagline">Tu biblioteca personal de videojuegos</p>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-button ${activeView === 'biblioteca' ? 'active' : ''}`}
          onClick={() => setActiveView('biblioteca')}
        >
          <FaGamepad /> Biblioteca
        </button>
        <button
          className={`nav-button ${activeView === 'reseñas' ? 'active' : ''}`}
          onClick={() => setActiveView('reseñas')}
        >
          <FaStar /> Reseñas
        </button>
        <button
          className={`nav-button ${activeView === 'estadisticas' ? 'active' : ''}`}
          onClick={() => setActiveView('estadisticas')}
        >
          <FaChartLine /> Estadísticas
        </button>
      </nav>

      <main className="app-main">
        {activeView === 'biblioteca' && (
          <BibliotecaJuegos
            juegos={juegos}
            reseñas={reseñas}
            onRefresh={handleRefresh}
          />
        )}
        {activeView === 'reseñas' && (
          <ListaReseñas
            reseñas={reseñas}
            juegos={juegos}
            onRefresh={handleRefresh}
          />
        )}
        {activeView === 'estadisticas' && (
          <EstadisticasPersonales
            juegos={juegos}
            reseñas={reseñas}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>GameTracker © 2025 - Gestiona tu colección de videojuegos</p>
      </footer>
    </div>
  );
}

export default App;
