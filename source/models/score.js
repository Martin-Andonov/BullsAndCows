import { Model } from 'objection';
import { Game } from './game.js'
export class Score extends Model {

    static tableName = "scores";
    userName;
    gameId;
    id;

    static relationMappings = {
        game:{
            relation: Model.BelongsToOneRelation,
            modelClass: Game,
            join:{
                from: 'scores.gameId',
                to: 'games.id'
            }
        }
    }   
}

