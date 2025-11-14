import { useState, useEffect } from 'react';
import { FaGamepad, FaStar, FaChartLine, FaSpinner, FaHeart, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import BibliotecaJuegos from './components/BibliotecaJuegos';
import ListaReseñas from './components/ListaReseñas';
import EstadisticasPersonales from './components/EstadisticasPersonales';
import Favoritos from './components/Favoritos';
import DashboardAdmin from './components/DashboardAdmin';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { gamesAPI, reviewsAPI } from './services/api';
import './App.css';

function AppContent() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [juegos, setJuegos] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('biblioteca');
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaGamepad className="logo-icon" />
              <h1>GameTracker</h1>
            </div>
            <p className="tagline">Tu biblioteca personal de videojuegos</p>
          </div>
        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '1rem', color: '#fff' }}>
                Hola, {user?.nombre}
              </span>
              <button
                className="btn-secondary"
                onClick={logout}
                style={{ marginRight: '0.5rem' }}
              >
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-secondary"
                onClick={() => setShowLogin(true)}
                style={{ marginRight: '0.5rem' }}
              >
                <FaSignInAlt /> Iniciar Sesión
              </button>
              <button
                className="btn-primary"
                onClick={() => setShowRegister(true)}
              >
                <FaUserPlus /> Registrarse
              </button>
            </>
          )}
        </div>
        </div>
      </header>

      <nav className="app-nav">
        <div className="nav-container">
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
          {isAuthenticated && (
            <button
              className={`nav-button ${activeView === 'favoritos' ? 'active' : ''}`}
              onClick={() => setActiveView('favoritos')}
            >
              <FaHeart /> Favoritos
            </button>
          )}
          <button
            className={`nav-button ${activeView === 'estadisticas' ? 'active' : ''}`}
            onClick={() => setActiveView('estadisticas')}
          >
            <FaChartLine /> Estadísticas
          </button>
          {isAdmin && (
            <button
              className={`nav-button ${activeView === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveView('admin')}
            >
              <FaUserShield /> Admin
            </button>
          )}
        </div>
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
        {activeView === 'favoritos' && isAuthenticated && (
          <Favoritos juegos={juegos} />
        )}
        {activeView === 'estadisticas' && (
          <EstadisticasPersonales
            juegos={juegos}
            reseñas={reseñas}
          />
        )}
        {activeView === 'admin' && isAdmin && (
          <DashboardAdmin />
        )}
        {activeView === 'favoritos' && !isAuthenticated && (
          <div className="empty-state">
            <p>Debes iniciar sesión para ver tus favoritos.</p>
            <button className="btn-primary" onClick={() => setShowLogin(true)}>
              Iniciar Sesión
            </button>
          </div>
        )}
        {activeView === 'admin' && !isAdmin && (
          <div className="error-container">
            <h2>Acceso Denegado</h2>
            <p>No tienes permisos para acceder al panel de administración.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>GameTracker © 2025 - Gestiona tu colección de videojuegos</p>
      </footer>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
