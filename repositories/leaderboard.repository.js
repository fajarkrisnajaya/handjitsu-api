const pool = require('../db/db');

const getLeaderboard = async () => {
  const result = await pool.query(`
   SELECT
    u.username,
    CAST(CAST(REPLACE(l.winrate, '%', '') AS DECIMAL(5,2)) AS CHAR(5)) || '%' AS winrate_text
FROM
    users u
JOIN
    (
        SELECT
            user_id,
            winrate,
            CAST(CAST(REPLACE(winrate, '%', '') AS DECIMAL(5,2)) AS CHAR(5)) || '%' AS winrate_text,
            ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY last_played DESC) AS rn
        FROM
            leaderboard
    ) l ON u.id = l.user_id
WHERE
    u.id != 9999
    AND l.rn = 1
ORDER BY
    CAST(REPLACE(l.winrate, '%', '') AS DECIMAL(5,2)) DESC;
  `);
  return result.rows;
};

module.exports = { getLeaderboard };