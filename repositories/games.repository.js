const pool = require('../db/db');
const { updateUserWinCount } = require('./users.repository');

const createGame = async (gameData) => {
  const { Player1ID, Player1_choice, Player2ID, Player2_choice, WinnerID, link_room } = gameData;
  const result = await pool.query(
    `INSERT INTO "public"."Game" ("Player1ID", "Player1_choice", "Player2ID", "Player2_choice", "WinnerID", "link_room") 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [Player1ID, Player1_choice, Player2ID, Player2_choice, WinnerID, link_room]
  );
  return result.rows[0];
};

const createSinglePlayerGame = async (gameData) => {
  const { Player1ID, link_room } = gameData;
  const Player2ID = 9999; // Special ID for the bot
  const result = await pool.query(
    `INSERT INTO "public"."Game" ("Player1ID", "Player2ID", "link_room") 
     VALUES ($1, $2, $3) RETURNING *`,
    [Player1ID, Player2ID, link_room]
  );
  return result.rows[0];
};

const updateGame = async (gameId, gameData) => {
  const { Player1ID, Player1_choice } = gameData;
  const botChoices = ['rock', 'paper', 'scissors'];
  const Player2_choice = botChoices[Math.floor(Math.random() * botChoices.length)];
  const WinnerID = determineWinner(Player1ID, 9999, Player1_choice, Player2_choice);
  const result = await pool.query(
    `UPDATE "public"."Game" SET "Player1_choice" = $1, "Player2_choice" = $2, "WinnerID" = $3 WHERE "GameID" = $4 RETURNING *`,
    [Player1_choice, Player2_choice, WinnerID, gameId]
  );

  if (WinnerID) {
    await updateUserWinCount(WinnerID);
  }

  return result.rows[0];
};

const getGameById = async (id) => {
  const result = await pool.query('SELECT * FROM "public"."Game" WHERE "GameID" = $1', [id]);
  return result.rows[0];
};

const determineWinner = (Player1ID, Player2ID, player1Choice, player2Choice) => {
  if (player1Choice === player2Choice) {
    return "tie"; // It's a tie
  } else if (
    (player1Choice === 'rock' && player2Choice === 'scissors') ||
    (player1Choice === 'scissors' && player2Choice === 'paper') ||
    (player1Choice === 'paper' && player2Choice === 'rock')
  ) {
    return Player1ID; // Player1 wins
  } else {
    return Player2ID; // Player2 (bot) wins
  }
};

module.exports = { createGame, createSinglePlayerGame, updateGame, getGameById };