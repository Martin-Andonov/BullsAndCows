import knex from 'knex';  
import knexConfig from './knexfile.js';
import express from 'express';
import { Model } from 'objection';
import { Score } from './source/models/score.js';
import { Game } from './source/models/game.js';


const app = express();
const port = 3000;
const knexClient = knex(knexConfig.development);  
Model.knex(knexClient);


app.get('/end', (req, res) => {
  res.send('Bye world!');
});

// app.get('/games/:gameID', (req, res) => {
//   const gameID = req.params.gameID;
//   const userName = req.query.userName;

//   if (!userName || !gameID) {
//     return res.status(400).json({ status: 'fail', message: 'Username and game ID are required' });
//   }

//   const isSaved = saveGame(userName, gameID);

//   if (isSaved) {
//     res.status(200).json({ status: 'success', message: 'Game saved successfully' });
//   } else {
//     res.status(500).json({ status: 'fail', message: 'Fail to save game'})
//   }
// });

app.get('/start', async (req, res) => {
  // await Score.query().insert({

  //   gameId:1,
  //   userName:'Ivan'

  // });
  const result = await Game.query().withGraphFetched('score').findById(1)
  res.send(result);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});

