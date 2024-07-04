import { Model } from 'objection';
import { Score } from './score.js';

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
        }
    }
}
