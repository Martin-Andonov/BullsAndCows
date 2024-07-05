import express from 'express';
import { Router } from 'express';
import { Game } from './../models/game.js'; 
const gamesRouter = Router();

gamesRouter.get('/end', (req, res) => {
  res.send('Bye world!');
});

gamesRouter.get('/:gameID', async (req, res) => {
  const gameID = parseInt(req.params.gameID);
  
  if (!gameID) {
    return res.status(400).json({ status: 'fail', message: 'Game ID are required' });
  }

  const game = await getGame(gameID);

  if (game) {
    res.status(200).json({ status: 'success', game });
  } else {
    res.status(404).json({ status: 'fail', message: 'No game found' });
  }
});

gamesRouter.get('/', async (req, res) => {
    
    const games = await getAllGames();
    
    
      res.status(200).json({ status: 'success', games_list: games });
  });

gamesRouter.get('/start', async (req, res) => {
  // await Score.query().insert({
  //   gameId: 1,
  //   userName: 'Ivan'
  // });

  try {
    const result = await Game.query().withGraphFetched('score').findById(1);
    res.send(result);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Failed to fetch game data' });
  }
});


async function getGame(gameID) {
    return await Game.query().findById(gameID);
  }
async function getAllGames(){
    return await Game.query();
}

  export {gamesRouter};