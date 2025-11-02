import { Review } from "../models/Review.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    }catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
}
