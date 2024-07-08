import knex from 'knex';  
import knexConfig from './knexfile.js';
import express, { json } from 'express';
import { Model } from 'objection';
import { Score } from './source/models/score.js';
import { Game } from './source/models/game.js';
// import { Guess } from './source/models/guess.js';
import { gamesRouter } from './source/routes/games.js';


const app = express();
const port = 3000;
const knexClient = knex(knexConfig.development);  
Model.knex(knexClient);
app.use(json());
app.use('/games',gamesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});

