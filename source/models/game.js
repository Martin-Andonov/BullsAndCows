import { Model } from 'objection';

export class Game extends Model {

    static tableName = "games";
    id;
    numberToGuess;
    numberOfAttempts;
    startTime;
    endTime;
    
}
