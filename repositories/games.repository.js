const pool = require('../db/db');

const createGame = async (gameData) => {
  console.log('createGame called with:', gameData);
  const result = await pool.query(
    `INSERT INTO "public"."Game" ("Player1ID", "Player1_choice", "Player2_choice", "WinnerID") VALUES ($1, $2, $3, $4) RETURNING *`,
    [gameData.Player1ID, gameData.Player1_choice, gameData.Player2_choice, gameData.WinnerID]
  );
  return result.rows[0];
};

const getGameById = async (gameId) => {
  console.log('getGameById called with:', gameId);
  const result = await pool.query(`SELECT * FROM "public"."Game" WHERE "GameID" = $1`, [gameId]);
  return result.rows[0];
};

const updateGame = async (gameId, gameData) => {
  console.log('updateGame called with:', gameId, gameData);
  const { Player1_choice, Player2_choice } = gameData;

  // Fetch the current game state
  const currentGame = await pool.query(`SELECT * FROM "public"."Game" WHERE "GameID" = $1`, [gameId]);
  if (currentGame.rows.length === 0) {
    throw new Error("Game not found");
  }

  const updatedPlayer1Choice = Player1_choice || currentGame.rows[0].Player1_choice;
  const updatedPlayer2Choice = Player2_choice || currentGame.rows[0].Player2_choice;

  const WinnerID = determineWinner(updatedPlayer1Choice, updatedPlayer2Choice);
  const result = await pool.query(
    `UPDATE "public"."Game" SET "Player1_choice" = $1, "Player2_choice" = $2, "WinnerID" = $3 WHERE "GameID" = $4 RETURNING *`,
    [updatedPlayer1Choice, updatedPlayer2Choice, WinnerID, gameId]
  );
  return result.rows[0];
};

const determineWinner = (Player1_choice, Player2_choice) => {
  console.log('determineWinner called with:', Player1_choice, Player2_choice);
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
  determineWinner,
};