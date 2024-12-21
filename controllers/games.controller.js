const gameService = require('../services/games.service');

const createGame = async (req, res) => {
  try {
    const game = await gameService.createGame(req.body);
    res.status(201).json({ data: game });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await gameService.getGameById(req.params.id);
    res.status(200).json({ data: game });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = { createGame, getGameById };