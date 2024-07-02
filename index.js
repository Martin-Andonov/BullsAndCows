import knex from 'knex';  
import knexConfig from './knexfile.js';
import express from 'express';

const app = express();
const port = 3000;
const knexClient = knex(knexConfig.development);  

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});