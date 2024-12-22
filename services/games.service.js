const gameRepository = require('../repositories/games.repository');

const createGame = async (gameData) => {
  return await gameRepository.createGame(gameData);
};

const getGameById = async (gameId) => {
  return await gameRepository.getGameById(gameId);
};

const updateGame = async (gameId, gameData) => {
  const game = await gameRepository.getGameById(gameId);
  if (!game) {
    throw new Error("Game not found");
  }

  const updatedGame = { ...game, ...gameData };

  // Only update choices if they are provided
  if (gameData.Player1_choice) {
    updatedGame.Player1_choice = gameData.Player1_choice;
  }
  if (gameData.Player2_choice) {
    updatedGame.Player2_choice = gameData.Player2_choice;
  }

  // Determine the winner only if both choices are made
  if (updatedGame.Player1_choice && updatedGame.Player2_choice) {
    updatedGame.WinnerID = determineWinner(updatedGame.Player1_choice, updatedGame.Player2_choice);
  }

  return await gameRepository.updateGame(gameId, updatedGame);
};

const createSinglePlayerGame = async (gameData) => {
  const botChoices = ['rock', 'paper', 'scissors'];
  const Player2_choice = botChoices[Math.floor(Math.random() * botChoices.length)];
  const WinnerID = determineWinner(gameData.Player1_choice, Player2_choice);

  const game = {
    Player1ID: gameData.Player1ID,
    Player1_choice: gameData.Player1_choice,
    Player2_choice,
    WinnerID,
  };

  return await gameRepository.createGame(game);
};

const determineWinner = (Player1_choice, Player2_choice) => {
  if (Player1_choice === Player2_choice) return null;
  if (
    (Player1_choice === 'rock' && Player2_choice === 'scissors') ||
    (Player1_choice === 'scissors' && Player2_choice === 'paper') ||
    (Player1_choice === 'paper' && Player2_choice === 'rock')
  ) {
    return 1; // Player 1 wins
  } else {
    return 2; // Player 2 wins
  }
};

module.exports = {
  createGame,
  getGameById,
  updateGame,
  createSinglePlayerGame,
};