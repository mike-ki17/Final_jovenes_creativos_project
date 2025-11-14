import { User } from '../models/User.js';
import { Game } from '../models/Game.js';
import { Review } from '../models/Review.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('favoritos', 'titulo');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (!rol || !['user', 'admin'].includes(rol)) {
      return res.status(400).json({ message: 'Rol inválido. Debe ser "user" o "admin"' });
    }

    // Prevent changing own role if it's the only admin
    if (rol === 'user' && req.user._id.toString() === id) {
      const adminCount = await User.countDocuments({ rol: 'admin' });
      if (adminCount === 1) {
        return res.status(400).json({ message: 'No puedes cambiar tu propio rol si eres el único administrador' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { rol },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      message: 'Rol de usuario actualizado',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol', error: error.message });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Prevent deleting the only admin
    if (user.rol === 'admin') {
      const adminCount = await User.countDocuments({ rol: 'admin' });
      if (adminCount === 1) {
        return res.status(400).json({ message: 'No se puede eliminar el único administrador' });
      }
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};

// Get dashboard statistics (admin only)
export const getDashboardStats = async (req, res) => {
  try {
    const [totalGames, totalReviews, totalUsers, totalAdmins] = await Promise.all([
      Game.countDocuments(),
      Review.countDocuments(),
      User.countDocuments(),
      User.countDocuments({ rol: 'admin' })
    ]);

    // Get average rating
    const reviews = await Review.find();
    const averageRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.puntuacion, 0) / reviews.length).toFixed(2)
      : 0;

    // Get games by genre
    const gamesByGenre = await Game.aggregate([
      { $group: { _id: '$genero', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get games by platform
    const gamesByPlatform = await Game.aggregate([
      { $group: { _id: '$plataforma', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      totalGames,
      totalReviews,
      totalUsers,
      totalAdmins,
      averageRating: parseFloat(averageRating),
      gamesByGenre,
      gamesByPlatform
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
};

