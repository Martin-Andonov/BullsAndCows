import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from './knexfile.js';

const knex = Knex(knexConfig.development);

Model.knex(knex);

export { Model };