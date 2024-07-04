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

