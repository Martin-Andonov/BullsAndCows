import express from 'express';
import { Router } from 'express';
import { Game } from './../models/game.js'; 
import { Score } from './../models/score.js'
const gamesRouter = Router();

gamesRouter.get('/end', (req, res) => {
  res.send('Bye world!');
});

gamesRouter.get('/viewGames', async (req, res) =>{
    const {userName} = req.query;
    const games = await Game.query()
    .withGraphJoined('score')
    .where('userName', '=', userName)
    res.status(200).json({ status: 'success', games_with_scores: games })
});

gamesRouter.get('/gameRanking', async (req, res) =>{
    const pageSize = req.query.pageSize;
    const pageNumber = parseInt(req.query.page) || 1;
    const gamesForPage = await Game.query().withGraphJoined('score').orderBy('score.number_of_attempts','desc').page(pageNumber-1, pageSize);
    res.status(200).json({ 
        status: 'success', 
        pageSize: pageSize,
        pageNumber: pageNumber,
        games: gamesForPage
    })

})

gamesRouter.post('/:gameId/end', async(req,res) => {
  const gameId = parseInt(req.params.gameId);

  if(!gameId)
  {
    return res.status(400).json({ status: 'fail', message: 'Error no guess or invalid end game provided!'});
  }
  
  try{
    updateEndGame(gameId);
    res.status(200).json({ status: 'success', message: 'Successesfully added time!' });
  } catch(error){
    console.error('Error saving game result:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

gamesRouter.post('/:gameId/result', async (req, res) => {
    const { userName } = req.body;
    const gameId  = parseInt(req.params.gameId);
    
    if (!(/^[a-zA-Z0-9]{5,20}$/.test(userName))) {
        return res.status(400).json({ status: 'fail', message: 'username is required' });
    }
  
    try {
      const game = await getGame(gameId);
        enterUsername(userName, gameId, game.guesses.length);
        res.status(200).json({ status: 'success', message: 'Success' });
    } catch (error) {
        console.error('Error saving game result:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
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
    res.status(200).json({ status: 'success', gameId:result.id});
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

async function updateEndGame(gameId)
{
  return await Game.query().findById(gameId).patch({end_time: new Date().toISOString()});
}

async function updateEndGame(gameId)
{
  return await Game.query().findById(gameId).patch({end_time: new Date().toISOString()});
}

async function enterUsername(userName, gameId, guessCount){
    return await Score.query().insert({
        
        gameId: gameId,
        userName:userName,
        numberOfAttempts: guessCount
    }
    );
}


async function getGame(gameID) {
    return await Game.query().withGraphJoined('guesses').findById(gameID);
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