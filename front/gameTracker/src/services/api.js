const API_BASE_URL = 'http://localhost:3000';

// Helper para obtener headers con token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Helper para manejar errores de autenticación
const handleResponse = async (response) => {
  if (response.status === 401) {
    // Token inválido o expirado
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error en la petición' }));
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};

// Funciones para Juegos
export const gamesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/juegos`);
    if (!response.ok) throw new Error('Error al obtener juegos');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/juegos/${id}`);
    if (!response.ok) throw new Error('Error al obtener el juego');
    return response.json();
  },

  create: async (gameData) => {
    const response = await fetch(`${API_BASE_URL}/api/juegos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(gameData),
    });
    return handleResponse(response);
  },

  update: async (id, gameData) => {
    const response = await fetch(`${API_BASE_URL}/api/juegos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(gameData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/juegos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Funciones para Reseñas
export const reviewsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/resenas`);
    if (!response.ok) throw new Error('Error al obtener reseñas');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/resenas/${id}`);
    if (!response.ok) throw new Error('Error al obtener la reseña');
    return response.json();
  },

  getByGameId: async (juegoId) => {
    const response = await fetch(`${API_BASE_URL}/api/resenas/juego/${juegoId}`);
    if (!response.ok) throw new Error('Error al obtener las reseñas del juego');
    return response.json();
  },

  create: async (reviewData) => {
    const response = await fetch(`${API_BASE_URL}/api/resenas`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    return handleResponse(response);
  },

  update: async (id, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/api/resenas/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/resenas/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

