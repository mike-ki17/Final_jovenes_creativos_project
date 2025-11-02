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