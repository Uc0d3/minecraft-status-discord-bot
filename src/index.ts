require('dotenv').config()
import assert from "assert";

import {Client, Collection, Message} from "discord.js";
import { BaseCommand } from "./Commands/BaseCommand";
import commands from './Commands';
import jobs from './Jobs';

const client = new Client();

const {
    DISCORD_LOGIN_TOKEN,
    COMMAND_PREFIX
} = process.env;

assert(COMMAND_PREFIX);

const commandsCollection: Collection<string, BaseCommand> = new Collection();

for (const command of commands) {
    commandsCollection.set(command.name, command);
}

client.on('ready', () => {
    for (const job of jobs) {
        (new job(client)).start();
    }

    console.log('Bot Reddy')
});

client.on('message', async (msg: Message) => {
    if (!msg.content.startsWith(COMMAND_PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase() || '';

    if (!commandsCollection.has(command)) return;
    await commandsCollection.get(command)?.execute(msg, args);
});

client.login(DISCORD_LOGIN_TOKEN);