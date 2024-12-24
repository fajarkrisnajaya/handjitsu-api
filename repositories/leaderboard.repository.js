const pool = require("../db/db");

const getLeaderboard = async () => {
  const result = await pool.query(`
  SELECT DISTINCT ON (l.user_id)
  l.leaderboard_id,
  l.user_id,
  u.username,
  l.rank,
  l.winrate,
  u.games_count AS last_played
  FROM leaderboard l
  JOIN users u ON l.user_id = u.id
  WHERE l.user_id != 9999
  ORDER BY l.user_id, l.winrate DESC

  `);
  return result.rows;
};

module.exports = { getLeaderboard };
