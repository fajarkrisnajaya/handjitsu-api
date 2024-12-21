const pool = require('../db/db');

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
  const { Player1_choice, Player2_choice, WinnerID } = gameData;
  const result = await pool.query(
    `UPDATE "public"."Game" SET "Player1_choice" = $1, "Player2_choice" = $2, "WinnerID" = $3 WHERE "GameID" = $4 RETURNING *`,
    [Player1_choice, Player2_choice, WinnerID, gameId]
  );
  return result.rows[0];
};

const getGameById = async (id) => {
  const result = await pool.query('SELECT * FROM "public"."Game" WHERE "GameID" = $1', [id]);
  return result.rows[0];
};

module.exports = { createGame, createSinglePlayerGame, updateGame, getGameById };