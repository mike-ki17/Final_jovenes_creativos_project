import { useState, useEffect } from 'react';
import { FaUsers, FaGamepad, FaStar, FaChartLine, FaTrash, FaEdit, FaSpinner } from 'react-icons/fa';
import { adminAPI } from '../services/admin';

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [usersData, statsData] = await Promise.all([
        adminAPI.getAllUsers(),
        adminAPI.getStats()
      ]);
      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading admin data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, rol: newRole } : u));
      setEditingRole(null);
    } catch (error) {
      alert('Error al actualizar rol: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }
    try {
      await adminAPI.deleteUser(userId);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (error) {
      alert('Error al eliminar usuario: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Cargando dashboard...</p>
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
    <div className="dashboard-admin">
      <div className="dashboard-header">
        <h2>
          <FaChartLine style={{ marginRight: '0.5rem' }} />
          Dashboard Administrativo
        </h2>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <FaGamepad className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.totalGames}</h3>
              <p>Juegos Totales</p>
            </div>
          </div>
          <div className="stat-card">
            <FaStar className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.totalReviews}</h3>
              <p>Reseñas Totales</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.totalUsers}</h3>
              <p>Usuarios</p>
            </div>
          </div>
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.averageRating}</h3>
              <p>Puntuación Promedio</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de Usuarios */}
      <div className="admin-section">
        <h3>Gestión de Usuarios</h3>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Favoritos</th>
                <th>Fecha Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>
                    {editingRole === user._id ? (
                      <select
                        value={user.rol}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        onBlur={() => setEditingRole(null)}
                        autoFocus
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                    ) : (
                      <span
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          background: user.rol === 'admin' ? '#e74c3c' : '#3498db',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                        onClick={() => setEditingRole(user._id)}
                      >
                        {user.rol === 'admin' ? 'Admin' : 'Usuario'}
                      </span>
                    )}
                  </td>
                  <td>{user.favoritos?.length || 0}</td>
                  <td>{new Date(user.fechaCreacion).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => setEditingRole(user._id)}
                      title="Editar rol"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDeleteUser(user._id)}
                      title="Eliminar usuario"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

