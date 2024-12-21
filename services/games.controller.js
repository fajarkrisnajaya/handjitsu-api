const gameRepository = require('../repositories/games.repository');

const createGame = async (gameData) => {
  const game = await gameRepository.createGame(gameData);
  return game;
};

const getGameById = async (id) => {
  const game = await gameRepository.getGameById(id);
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
};

module.exports = { createGame, getGameById };