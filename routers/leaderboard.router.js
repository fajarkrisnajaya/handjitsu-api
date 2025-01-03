const express = require('express');
const router = express.Router();

const leaderboardController = require('../controllers/leaderboard.controller');

router.get('/leaderboard', leaderboardController.getLeaderboard);

module.exports = router;