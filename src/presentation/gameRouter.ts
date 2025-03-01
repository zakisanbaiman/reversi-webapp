import express from 'express';

import { GameService } from '../application/service/gameService';

export const gameRouter = express.Router()

const gameService = new GameService();

gameRouter.post('/api/games', async (req, res) => {
  await gameService.startNewGame();

  res.status(201).end();
});