import knex from 'knex';  
import knexConfig from './knexfile.js';
import express, { json } from 'express';
import { Model } from 'objection';
import { gamesRouter } from './source/routes/games.js';
import cors from 'cors';

const app = express();
const port = 3000;
const knexClient = knex(knexConfig.development);  
Model.knex(knexClient);
app.use(json());
app.use(cors());
app.use('/static', express.static('./pages'));
app.use('/games',gamesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});

