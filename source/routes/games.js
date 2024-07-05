import express from 'express';
import { Router } from 'express';
import { Game } from './../models/game.js'; 
const gamesRouter = Router();


gamesRouter.get('/viewGames', async (req, res) =>{
    const {userName} = req.query;
    const games = await Game.query()
    .withGraphJoined('score')
    .where('userName', '=', userName)
    res.status(200).json({ status: 'success', score: games })
});

gamesRouter.post('/saveGames', async (req, res) =>{
   // const {userName, gameID} = req.body;
    console.log(req.body);
    res.status(200).json({ status: 'success'})
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

  
gamesRouter.post('/start', async (req, res) => {

  const result = await createGame(generateNumber());

  if (result) {
    res.status(200).json({ status: 'success', gameid:result.id});
  } else {
    res.status(404).json({ status: 'fail', message: 'Error while creating game!' });
  }

});

//function to generate 4 digit number with unique digits
function generateNumber()
{
  let digitsArr = ['0','1','2','3','4','5','6','7','8','9'];
  let generatedNumber = '';
  for(let i = 0; i < 4; i++)
  {
    let index = Math.floor(Math.random() * digitsArr.length);
    generatedNumber += digitsArr[index];
    digitsArr.splice(index, 1); 
  }

  return generatedNumber;
  
}


async function geAllGamesUn(userName){
    return await Game.query(userName);
}
async function getGame(gameID) {
    return await Game.query().findById(gameID);
  }
async function getAllGames(){
    return await Game.query();
}

async function createGame(generatedNumber)
{
  return await Game.query().insert({
  numberToGuess:generatedNumber 
  })
}
export {gamesRouter};