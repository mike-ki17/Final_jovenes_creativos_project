const API_BASE_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const favoritesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/favoritos`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autenticado');
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener favoritos');
    }
    return response.json();
  },

  add: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/api/favoritos/${gameId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autenticado');
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al agregar a favoritos');
    }
    return response.json();
  },

  remove: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/api/favoritos/${gameId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autenticado');
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al remover de favoritos');
    }
    return response.json();
  },

  check: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/api/favoritos/check/${gameId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      if (response.status === 401) {
        return { isFavorite: false };
      }
      const error = await response.json();
      throw new Error(error.message || 'Error al verificar favorito');
    }
    return response.json();
  },
};

