import { Model } from 'objection';

export class Guess extends Model
{
    static tableName = "guesses";
    id;
    gameId;
    bullsCount;
    cowsCount;
    guess;

    static relationMappings = {
        game:{
            relation: Model.BelongsToOneRelation,
            modelClass: './game.js',
            join:{
                from: 'guesses.gameId',
                to: 'games.id'
            }
        }
    }   
}