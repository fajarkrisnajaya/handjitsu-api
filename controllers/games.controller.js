const gameService = require('../services/games.service');

const createGame = async (req, res) => {
  try {
    const game = await gameService.createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await gameService.getGameById(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const game = await gameService.updateGame(req.params.id, req.body);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSinglePlayerGame = async (req, res) => {
  try {
    const game = await gameService.createSinglePlayerGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGame,
  getGameById,
  updateGame,
  createSinglePlayerGame,
};