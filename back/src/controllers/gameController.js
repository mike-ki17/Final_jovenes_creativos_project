import { Game } from "../models/Game.js";

// --- Obtener TODOS los juegos ---
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();

    // 3. Respondes con los juegos encontrados en formato JSON
    res.status(200).json(games);

  } catch (error) {
    // 4. Manejo de errores
    res.status(500).json({ message: 'Error al obtener los juegos', error });
  }
};



export const getGameById = async (req, res) => {
    const { id } = req.params;
    try {
        const game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el juego', error });
    }
}

// --- Crear un nuevo juego ---
export const createGame = async (req, res) => {
    try {
        const { titulo, genero, plataforma, añoLanzamiento, desarrollador, imagenPortada, descripcion, completado } = req.body;

        // Validaciones básicas
        if (!titulo || !genero || !plataforma || !añoLanzamiento || !desarrollador || !imagenPortada || !descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newGame = new Game({
            titulo,
            genero,
            plataforma,
            añoLanzamiento,
            desarrollador,
            imagenPortada,
            descripcion,
            completado: completado || false
        });

        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Ya existe un juego con ese título' });
        }
        res.status(500).json({ message: 'Error al crear el juego', error: error.message });
    }
}

// --- Actualizar un juego ---
export const updateGame = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            id,
            { ...req.body, fechaCreacion: undefined }, // No permitir actualizar fechaCreacion
            { new: true, runValidators: true }
        );

        if (!updatedGame) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        res.status(200).json(updatedGame);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Ya existe un juego con ese título' });
        }
        res.status(500).json({ message: 'Error al actualizar el juego', error: error.message });
    }
}

// --- Eliminar un juego ---
export const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGame = await Game.findByIdAndDelete(id);

        if (!deletedGame) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        res.status(200).json({ message: 'Juego eliminado correctamente', game: deletedGame });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el juego', error: error.message });
    }
}