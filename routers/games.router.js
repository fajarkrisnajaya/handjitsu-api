const express = require('express');
const router = express.Router();

const gameController = require('../controllers/games.controller');

router.post('/games', gameController.createGame);
router.get('/games/:id', gameController.getGameById);

module.exports = router;