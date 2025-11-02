import {Router} from "express";
import { getAllGames, getGameById } from "../src/controllers/gameController.js";
import { getAllReviews } from "../src/controllers/reviewController.js";

const router = Router();



// -- Juegos --
router.get("/api/juegos", getAllGames);
router.get("/api/juegos/:id", getGameById);

// -- Reseñas --
router.get("/api/resenas", getAllReviews);




export default router;