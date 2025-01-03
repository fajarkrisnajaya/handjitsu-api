const pool = require('../db/db');
const gameRepository = require('../repositories/games.repository');

const createGame = async (gameData) => {
  const game = await gameRepository.createGame(gameData);
  return game;
};

const updateGame = async (gameId, gameData) => {
  const game = await gameRepository.getGameById(gameId);
  if (!game) {
    throw new Error("Game not found");
  }
  const updatedGame = { ...game, ...gameData };
  if (updatedGame.Player1_choice && !updatedGame.Player2_choice) {
    const botChoices = ['rock', 'paper', 'scissors'];
    updatedGame.Player2_choice = botChoices[Math.floor(Math.random() * botChoices.length)];
    updatedGame.WinnerID = determineWinner(updatedGame.Player1ID, updatedGame.Player2ID, updatedGame.Player1_choice, updatedGame.Player2_choice);
  }
  const result = await gameRepository.updateGame(gameId, updatedGame);
  return result;
};

const getGameById = async (id) => {
  const game = await gameRepository.getGameById(id);
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
};

const createSinglePlayerGame = async (gameData) => {
  const game = await gameRepository.createSinglePlayerGame(gameData);
  return game;
};

const createMultiplayerGame = async (gameData) => {
  const game = await gameRepository.createGame({
    ...gameData,
    isMultiplayer: true
  });
  return game;
};

const updateMultiplayerGame = async (gameId, gameData) => {
  const game = await gameRepository.getGameById(gameId);
  if (!game) throw new Error("Game not found");
  
  const updatedGame = { ...game, ...gameData };
  if (updatedGame.Player1_choice && updatedGame.Player2_choice) {
    updatedGame.WinnerID = determineWinner(
      updatedGame.Player1ID, 
      updatedGame.Player2ID,
      updatedGame.Player1_choice,
      updatedGame.Player2_choice
    );
  }
  return await gameRepository.updateGame(gameId, updatedGame);
};

const determineWinner = (player1ID, player2ID, player1Choice, player2Choice) => {
  if (player1Choice === player2Choice) {
    return null; // It's a tie
  } else if (
    (player1Choice === 'rock' && player2Choice === 'scissors') ||
    (player1Choice === 'scissors' && player2Choice === 'paper') ||
    (player1Choice === 'paper' && player2Choice === 'rock')
  ) {
    return player1ID;
  } else {
    return player2ID;
  }
};

module.exports = { createGame, updateGame, getGameById, createSinglePlayerGame, createMultiplayerGame,updateMultiplayerGame };