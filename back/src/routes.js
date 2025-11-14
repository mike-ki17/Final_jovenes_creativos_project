import {Router} from "express";
import { getAllGames, getGameById, createGame, updateGame, deleteGame } from "../src/controllers/gameController.js";
import { getAllReviews, getReviewById, getReviewsByGameId, createReview, updateReview, deleteReview } from "../src/controllers/reviewController.js";
import { register, login, getCurrentUser, createAdmin } from "../src/controllers/authController.js";
import { getFavorites, addFavorite, removeFavorite, isFavorite } from "../src/controllers/favoriteController.js";
import { getAllUsers, updateUserRole, deleteUser, getDashboardStats } from "../src/controllers/adminController.js";
import { authenticate, isAdmin } from "../src/middleware/auth.js";

const router = Router();

// -- Autenticación --
router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.get("/api/auth/me", authenticate, getCurrentUser);
router.post("/api/auth/create-admin", createAdmin); // Endpoint público para crear primer admin

// -- Favoritos (requieren autenticación) --
router.get("/api/favoritos", authenticate, getFavorites);
router.post("/api/favoritos/:gameId", authenticate, addFavorite);
router.delete("/api/favoritos/:gameId", authenticate, removeFavorite);
router.get("/api/favoritos/check/:gameId", authenticate, isFavorite);

// -- Admin (requieren autenticación y rol admin) --
router.get("/api/admin/users", authenticate, isAdmin, getAllUsers);
router.put("/api/admin/users/:id/role", authenticate, isAdmin, updateUserRole);
router.delete("/api/admin/users/:id", authenticate, isAdmin, deleteUser);
router.get("/api/admin/stats", authenticate, isAdmin, getDashboardStats);

// -- Juegos --
router.get("/api/juegos", getAllGames);
router.get("/api/juegos/:id", getGameById);
router.post("/api/juegos", authenticate, isAdmin, createGame); // Solo admin puede crear
router.put("/api/juegos/:id", authenticate, isAdmin, updateGame); // Solo admin puede actualizar
router.delete("/api/juegos/:id", authenticate, isAdmin, deleteGame); // Solo admin puede eliminar

// -- Reseñas --
router.get("/api/resenas", getAllReviews);
router.get("/api/resenas/:id", getReviewById);
router.get("/api/resenas/juego/:juegoId", getReviewsByGameId);
router.post("/api/resenas", authenticate, createReview); // Requiere autenticación
router.put("/api/resenas/:id", authenticate, updateReview); // Requiere autenticación
router.delete("/api/resenas/:id", authenticate, deleteReview); // Requiere autenticación

export default router;