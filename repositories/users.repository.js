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
    const result = await pool.query("SELECT * FROM transactions where id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateUserBalance = async (id, balance) => {
  try {
    await pool.query("UPDATE users SET balance = $1 WHERE id = $2", [balance, id]);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateUserWinCount = async (winnerID) => {
  try {
    // Increment win count in users table
    await pool.query("UPDATE users SET win_count = win_count + 1 WHERE id = $1", [winnerID]);

    // Fetch the updated win_count and games_count from users
    const result = await pool.query("SELECT win_count, games_count FROM users WHERE id = $1", [winnerID]);
    const { win_count, games_count } = result.rows[0];

    // Calculate winrate
    const winrate = (win_count * 100.0 / NULLIF(games_count, 0));

    // Update winrate in leaderboard
    await pool.query("UPDATE leaderboard SET winrate = $1 WHERE user_id = $2", [winrate, winnerID]);
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while updating win count and winrate");
  }
};
module.exports = { createUser, findUserByEmail, findUserById, findTransactionById, updateUserBalance, updateUserWinCount };