import {Router} from "express";
import { getAllGames, getGameById, createGame, updateGame, deleteGame } from "../src/controllers/gameController.js";
import { getAllReviews, getReviewById, getReviewsByGameId, createReview, updateReview, deleteReview } from "../src/controllers/reviewController.js";

const router = Router();

// -- Juegos --
router.get("/api/juegos", getAllGames);
router.get("/api/juegos/:id", getGameById);
router.post("/api/juegos", createGame);
router.put("/api/juegos/:id", updateGame);
router.delete("/api/juegos/:id", deleteGame);

// -- Reseñas --
router.get("/api/resenas", getAllReviews);
router.get("/api/resenas/:id", getReviewById);
router.get("/api/resenas/juego/:juegoId", getReviewsByGameId);
router.post("/api/resenas", createReview);
router.put("/api/resenas/:id", updateReview);
router.delete("/api/resenas/:id", deleteReview);

export default router;