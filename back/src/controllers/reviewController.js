import { Review } from "../models/Review.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    }catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
}


export const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);               
        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reseña', error });
    }
}   