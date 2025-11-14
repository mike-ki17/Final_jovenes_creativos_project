import { Review } from "../models/Review.js";
import { Game } from "../models/Game.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('juegoId', 'titulo imagenPortada')
            .populate('usuarioId', 'nombre email');
        res.status(200).json(reviews);
    }catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
}

export const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id)
            .populate('juegoId', 'titulo imagenPortada')
            .populate('usuarioId', 'nombre email');
        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reseña', error });
    }
}

// --- Obtener reseñas por juegoId ---
export const getReviewsByGameId = async (req, res) => {
    const { juegoId } = req.params;
    try {
        // Verificar que el juego existe
        const game = await Game.findById(juegoId);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        const reviews = await Review.find({ juegoId })
            .populate('juegoId', 'titulo imagenPortada')
            .populate('usuarioId', 'nombre email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas del juego', error: error.message });
    }
}

// --- Crear una nueva reseña ---
export const createReview = async (req, res) => {
    try {
        const { juegoId, puntuacion, textoReseña, horasJugadas, dificultad, recomendaria } = req.body;

        // Validaciones básicas
        if (!juegoId || !puntuacion) {
            return res.status(400).json({ message: 'Faltan campos requeridos: juegoId y puntuacion' });
        }

        if (puntuacion < 1 || puntuacion > 5) {
            return res.status(400).json({ message: 'La puntuación debe estar entre 1 y 5' });
        }

        // Verificar que el juego existe
        const game = await Game.findById(juegoId);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        const newReview = new Review({
            juegoId,
            usuarioId: req.user?._id || null, // Asociar con usuario si está autenticado
            puntuacion,
            textoReseña: textoReseña || '',
            horasJugadas: horasJugadas || 0,
            dificultad,
            recomendaria: recomendaria !== undefined ? recomendaria : true
        });

        const savedReview = await newReview.save();
        const populatedReview = await Review.findById(savedReview._id)
            .populate('juegoId', 'titulo imagenPortada')
            .populate('usuarioId', 'nombre email');
        res.status(201).json(populatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reseña', error: error.message });
    }
}

// --- Actualizar una reseña ---
export const updateReview = async (req, res) => {
    const { id } = req.params;
    try {
        // Validar puntuación si se está actualizando
        if (req.body.puntuacion !== undefined && (req.body.puntuacion < 1 || req.body.puntuacion > 5)) {
            return res.status(400).json({ message: 'La puntuación debe estar entre 1 y 5' });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { ...req.body, fechaCreacion: undefined }, // No permitir actualizar fechaCreacion
            { new: true, runValidators: true }
        )
        .populate('juegoId', 'titulo imagenPortada')
        .populate('usuarioId', 'nombre email');

        if (!updatedReview) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reseña', error: error.message });
    }
}

// --- Eliminar una reseña ---
export const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }

        res.status(200).json({ message: 'Reseña eliminada correctamente', review: deletedReview });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reseña', error: error.message });
    }
}   