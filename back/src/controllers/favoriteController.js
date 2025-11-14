import { User } from '../models/User.js';
import { Game } from '../models/Game.js';

// Get user's favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favoritos');
    res.status(200).json(user.favoritos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error: error.message });
  }
};

// Add game to favorites
export const addFavorite = async (req, res) => {
  try {
    const { gameId } = req.params;

    // Verify game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    // Check if already in favorites
    const user = await User.findById(req.user._id);
    if (user.favoritos.includes(gameId)) {
      return res.status(400).json({ message: 'El juego ya está en favoritos' });
    }

    // Add to favorites
    user.favoritos.push(gameId);
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate('favoritos', 'titulo imagenPortada genero plataforma');

    res.status(200).json({
      message: 'Juego agregado a favoritos',
      favoritos: updatedUser.favoritos
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a favoritos', error: error.message });
  }
};

// Remove game from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { gameId } = req.params;

    const user = await User.findById(req.user._id);
    
    // Check if game is in favorites
    if (!user.favoritos.includes(gameId)) {
      return res.status(400).json({ message: 'El juego no está en favoritos' });
    }

    // Remove from favorites
    user.favoritos = user.favoritos.filter(id => id.toString() !== gameId);
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate('favoritos', 'titulo imagenPortada genero plataforma');

    res.status(200).json({
      message: 'Juego removido de favoritos',
      favoritos: updatedUser.favoritos
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al remover de favoritos', error: error.message });
  }
};

// Check if game is favorite
export const isFavorite = async (req, res) => {
  try {
    const { gameId } = req.params;

    const user = await User.findById(req.user._id);
    const isFav = user.favoritos.some(id => id.toString() === gameId);

    res.status(200).json({ isFavorite: isFav });
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar favorito', error: error.message });
  }
};

