import knex from 'knex';  
import knexConfig from './knexfile.js';
import express from 'express';
import { Model } from 'objection';
import { Score } from './source/models/score.js';
import { Game } from './source/models/game.js';
import { Guess } from './source/models/guess.js';
import { gamesRouter } from './source/routes/games.js';
import { guessRouter } from './source/routes/guesses.js';


const app = express();
const port = 3000;
const knexClient = knex(knexConfig.development);  
Model.knex(knexClient);

app.use('/games',gamesRouter);
app.use('/guess',guessRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});

