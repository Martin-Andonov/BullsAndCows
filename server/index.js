import knex from 'knex';  
import knexConfig from './knexfile.js';
import express, { json } from 'express';
import { Model } from 'objection';
import { gamesRouter } from './source/routes/games.js';
import { guessRouter } from './source/routes/guesses.js';
import  cors from 'cors';

const app = express();
const port = 3000;
const knexClient = knex(knexConfig.development);  
Model.knex(knexClient);
app.use(cors());
app.use(json());
app.use('/games',gamesRouter);
app.use('/guess',guessRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});

