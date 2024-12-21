const express = require('express');
const router = express.Router();

const gameController = require('../controllers/games.controller');

router.post('/games', gameController.createGame);
router.get('/games/:id', gameController.getGameById);
router.put('/games/:id', gameController.updateGame); // Add this line

module.exports = router;