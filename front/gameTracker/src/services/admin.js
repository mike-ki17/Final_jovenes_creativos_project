const API_BASE_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const adminAPI = {
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autenticado');
      }
      if (response.status === 403) {
        throw new Error('Acceso denegado. Se requiere rol de administrador');
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener usuarios');
    }
    return response.json();
  },

  updateUserRole: async (userId, rol) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rol }),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autenticado');
      }
      if (response.status === 403) {
        throw new Error('Acceso denegado. Se requiere rol de administrador');
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar rol');
    }
    return response.json();
  },

  deleteUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autenticado');
      }
      if (response.status === 403) {
        throw new Error('Acceso denegado. Se requiere rol de administrador');
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar usuario');
    }
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autenticado');
      }
      if (response.status === 403) {
        throw new Error('Acceso denegado. Se requiere rol de administrador');
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener estadísticas');
    }
    return response.json();
  },
};

