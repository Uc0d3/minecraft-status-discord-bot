import UpdateBotPresence from "./UpdateBotPresence";
import BaseJob from "./BaseJob";
import {symlink} from "fs";

class A {}

interface BaseJobInterface { new(): BaseJob }


const jobs = [
    UpdateBotPresence
];

export default jobs