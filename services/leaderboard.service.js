const leaderboardRepository = require('../repositories/leaderboard.repository');

const getLeaderboard = async () => {
  const leaderboard = await leaderboardRepository.getLeaderboard();
  return leaderboard;
};

module.exports = { getLeaderboard };