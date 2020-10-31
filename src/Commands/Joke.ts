import {wait} from "../utils/wait";

const fetch = require('node-fetch');

import { BaseCommand } from "./BaseCommand";

import {Message} from "discord.js";
import {sendDelayed} from "../discord/utils";


export default class Joke extends BaseCommand {
    name = 'joke';
    description = 'Shows a random programming joke';

   async execute(msg: Message, args: string[]): Promise<void> {
        msg.channel.startTyping();

        try {
            const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random')
            const [joke]  = await res.json();
            if (joke) {
                const setup = await msg.channel.send(joke.setup);
                await sendDelayed(() => {
                    return setup.reply(joke.punchline);
                }, msg, 3000);
            }
        } catch (e) {
            console.error(e);
        } finally {
        }
    }
}