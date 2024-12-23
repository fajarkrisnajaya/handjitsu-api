const pool = require("../db/db");

const findUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users where id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  const { email, username, password, avatar_url } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (email, username, password, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, username, password, avatar_url]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

const findTransactionById = async (id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions where id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateUserBalance = async (id, balance) => {
  try {
    await pool.query("UPDATE users SET balance = $1 WHERE id = $2", [
      balance,
      id,
    ]);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateUserWinCount = async (winnerID) => {
  try {
    await pool.query(
      "UPDATE users SET win_count = win_count + 1 WHERE id = $1",
      [winnerID]
    );
  } catch (error) {
    throw new Error("Something went wrong while updating win count");
  }
};

const getLeaderboard = async () => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT ON (user_id)
        leaderboard_id,
        user_id,
        rank,
        winrate,
        last_played
      FROM leaderboard
      WHERE user_id != 9999
      ORDER BY user_id, last_played DESC;
    `);
    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong while fetching the leaderboard");
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findTransactionById,
  updateUserBalance,
  updateUserWinCount,
  getLeaderboard,
};
