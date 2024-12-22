const express = require('express');
const router = express.Router();

const gameController = require('../controllers/games.controller');

router.post('/games', gameController.createGame); // Player 1 creates the game
router.get('/games/:id', gameController.getGameById); // Get game details
router.put('/games/:id', gameController.updateGame); // Players make their choices
router.post('/games/singleplayer', gameController.createSinglePlayerGame); // Single-player game

module.exports = router;