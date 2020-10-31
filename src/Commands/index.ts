import {BaseCommand} from "./BaseCommand";
import McStatus from "./McStatus";
import Insult  from "./Insult";
import Joke from "./Joke";

const commands: BaseCommand[] = [
    new McStatus(),
    new Insult(),
    new Joke()
];

export default commands