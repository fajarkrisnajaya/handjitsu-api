const pool = require('../db/db');

const getLeaderboard = async () => {
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
};

module.exports = { getLeaderboard };