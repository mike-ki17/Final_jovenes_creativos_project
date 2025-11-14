const API_BASE_URL = 'http://localhost:3000';

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear el juego');
    }
    return response.json();
  },

  update: async (id, gameData) => {
    const response = await fetch(`${API_BASE_URL}/api/juegos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar el juego');
    }
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/juegos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar el juego');
    }
    return response.json();
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear la reseña');
    }
    return response.json();
  },

  update: async (id, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/api/resenas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar la reseña');
    }
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/resenas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar la reseña');
    }
    return response.json();
  },
};

