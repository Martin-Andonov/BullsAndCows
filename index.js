import { Knex } from 'knex';
import knexConfig from './knexfile';
const express = require('express');
const app = express();
const port = 3000;
const knexClient = Knex(knexConfig.development);

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!`);
});