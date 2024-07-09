import { Model } from 'objection';
import { Score } from './score.js';
import { Guess } from './guess.js';

export class Game extends Model {

    static tableName = "games";
    id;
    numberToGuess;
    numberOfAttempts;
    startTime;
    endTime;
    
    static relationMappings = {
        score:{
            relation: Model.HasOneRelation,
            modelClass: Score,
            join:{
                from:'games.id',
                to: 'scores.gameId'
            }
        },
        guesses:{
            relation: Model.HasManyRelation,
            modelClass: Guess,
            join:{
                from:'games.id',
                to: 'guesses.gameId'
            }
        }
    }
}
