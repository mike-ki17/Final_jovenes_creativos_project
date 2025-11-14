// /models/Review.js (Ejemplo de tu segundo schema)
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId, // Le dice a Mongoose que guardará un ID
    ref: "Game", // Le dice a Mongoose que este ID pertenece al modelo 'Game'
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Hacer opcional para compatibilidad con datos existentes
  },
  puntuacion: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  textoReseña: {
    type: String,
    trim: true,
  },
  horasJugadas: {
    type: Number,
    default: 0,
  },
  dificultad: {
    type: String,
    enum: ["Fácil", "Normal", "Difícil", "Muy Difícil"], // 'enum' restringe los valores
  },
  recomendaria: {
    type: Boolean,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

// Opcional: Para que 'fechaActualizacion' se actualice sola
reviewSchema.pre("save", function (next) {
  this.fechaActualizacion = Date.now();
  next();
});

export const Review = mongoose.model("Review", reviewSchema);
