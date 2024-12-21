const pool = require('../db/db');

const createGame = async (gameData) => {
  const { Player1ID, Player2ID, WinnerID, Player1_choice, Player2_choice, link_room } = gameData;
  const result = await pool.query(
    `INSERT INTO "public"."Game" ("Player1ID", "Player2ID", "WinnerID", "Player1_choice", "Player2_choice", "link_room") 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [Player1ID, Player2ID, WinnerID, Player1_choice, Player2_choice, link_room]
  );
  return result.rows[0];
};

const getGameById = async (id) => {
  const result = await pool.query('SELECT * FROM "public"."Game" WHERE "GameID" = $1', [id]);
  return result.rows[0];
};

module.exports = { createGame, getGameById };