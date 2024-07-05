import { Router } from 'express';
import { Guess } from '../models/guess.js';
import { Game } from './../models/game.js'; 

const guessRouter = Router();

guessRouter.get('/:guessID', async (req, res) => {
    const guessID = parseInt(req.params.guessID);
 
    if (!guessID) {
      return res.status(400).json({ status: 'fail', message: 'Guess Id is required!'});
    }

    const guess = await getGuessesById(guessID);
  
    if (guess) {
      res.status(200).json({ status: 'success', guess});
    } else {
      res.status(404).json({ status: 'fail', message: 'No guess found!' });
    }
});


guessRouter.get('/by-game/:gameID', async (req, res) => {
    const gameID = parseInt(req.params.gameID);
 
    if (!gameID || !await Game.query().findById(gameID)) {
      return res.status(400).json({ status: 'fail', message: 'Invalid gameId chek if game with that id exists!'});
    }

    const guesses = await getAllGuessesByGameId(gameID);
  
    if (guesses) {
      res.status(200).json({ status: 'success', guesses });
    } else {
      res.status(404).json({ status: 'fail', message: 'Error while getting guesses!' });
    }
});

guessRouter.post("/create", async(req,res) => 
{

})


async function getAllGuessesByGameId(gameID){
    return await Guess.query().where("gameId",gameID);
}

async function getGuessesById(guessID){
    return await Guess.query().findById(guessID);
}


export { guessRouter };