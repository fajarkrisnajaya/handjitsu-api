const leaderboardService = require('../services/leaderboard.service');

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await leaderboardService.getLeaderboard();
    res.status(200).json({ data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLeaderboard };