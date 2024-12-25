const express = require('express');
const router = express.Router();

const gameController = require('../controllers/games.controller');

router.post('/games', gameController.createGame);
router.get('/games/:id', gameController.getGameById);
router.put('/games/:id', gameController.updateGame);
router.post('/games/singleplayer', gameController.createSinglePlayerGame); // Add this line
// New multiplayer specific route
router.post('/games/multiplayer', gameController.createMultiplayerGame);
router.put('/games/multiplayer/:id', gameController.updateMultiplayerGame);
module.exports = router;