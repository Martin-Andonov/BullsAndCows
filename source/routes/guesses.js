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


guessRouter.post("/create/:gameID", async(req,res) => 
{
  const guess = String(req.body["guess"]);
  const gameID = parseInt(req.params.gameID);
  
  if (!/^(?!.*(.).*\1)\d{4}$/.test(guess)) 
  {
    return res.status(400).json({ status: 'fail', message: 'Error no guess or invalid guess provided!'});
  }
  
  if (!gameID) {
    return res.status(400).json({ status: 'fail', message: 'Invalid gameId!'});
  }

  const game = await Game.query().findById(gameID);

  if(!game)
  {
    return res.status(400).json({ status: 'fail', message: 'No game with that Id exists!'});
  } 

  let animals = checkBullsAndCows(game,guess);
  let hasGuessed = animals.bullsCount === 4;

  const result = await createGuessForGame(gameID,guess,animals.bullsCount,animals.cowsCount);

  if (result) {
    return res.status(200).json({ status: 'success', bullsCount:animals.bullsCount, cowsCount:animals.cowsCount, hasGuessed:hasGuessed});
  } else {
    return res.status(404).json({ status: 'fail', message: 'Error while creating game!' });
  }

});

function checkBullsAndCows(game,guess)
{
  
  let animalCounts = { 
    bullsCount: 0,
    cowsCount: 0
  }
  
  for(let i = 0; i < 4; i++)
  {
    if(guess.includes(game.numberToGuess.charAt(i))) 
    {
      if(guess.indexOf(game.numberToGuess.charAt(i)) == i)
      {
        animalCounts.bullsCount ++;
      }else{
        animalCounts.cowsCount ++;
      }
    }
  }

  return animalCounts;
}

async function createGuessForGame(gameID,guess,bullsCount,cowsCount){
  return await Guess.query().insert({
    guess:guess,
    gameId:gameID,
    bullsCount:bullsCount,
    cowsCount:cowsCount
    })
}

async function getAllGuessesByGameId(gameID){
    return await Guess.query().where("gameId",gameID);
}

async function getGuessesById(guessID){
    return await Guess.query().findById(guessID);
}


export { guessRouter };