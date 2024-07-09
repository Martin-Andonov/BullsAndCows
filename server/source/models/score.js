import { Model } from 'objection';
export class Score extends Model {

    static tableName = "scores";
    userName;
    gameId;
    id;
    static relationMappings = {
        game:{
            relation: Model.BelongsToOneRelation,
            modelClass: './game.js',
            join:{
                from: 'scores.gameId',
                to: 'games.id'
            }
        }
    }   
}

