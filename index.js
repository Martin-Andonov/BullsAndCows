import knex from 'knex';  
import knexConfig from './knexfile.js';
import express from 'express';
import { Model } from 'objection';
import { Game } from './source/models/game.js';


const app = express();
const port = 3000;
const knexClient = knex(knexConfig.development);  
Model.knex(knexClient);


app.get('/end', (req, res) => {
  res.send('Bye world!');
});


app.get('/start', async (req, res) => {
  await Game.query().insert({
    
    numberToGuess:1234,
    numberOfAttempts:0

  });
  res.send('Hello world!');

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});