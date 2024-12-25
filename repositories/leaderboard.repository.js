const pool = require('../db/db');

const getLeaderboard = async () => {
  const result = await pool.query(`
    SELECT
    u.username,
    CAST(CAST(REPLACE(l.winrate, '%', '') AS DECIMAL(5,2)) AS CHAR(5)) || '%' AS winrate_text,
    l.last_played
FROM
    users u
JOIN
    leaderboard l ON u.id = l.user_id
WHERE
    u.id != 9999
ORDER BY
    CAST(REPLACE(l.winrate, '%', '') AS DECIMAL(5,2)) DESC;

  `);
  return result.rows;
};

module.exports = { getLeaderboard };