const fetch = require('node-fetch');

import { BaseCommand } from "./BaseCommand";

import {getUserFromMention, offlineStatusEmbed, onlineStatusEmbed} from "../discord/utils";
import {Message} from "discord.js";


export default class Insult extends BaseCommand {
    name = 'insult';
    description = 'Generate an insult';

    async execute(msg: Message, args: string[]): Promise<void> {
        try {
            msg.channel.startTyping();
            const res = await fetch('https://insult.mattbas.org/api/insult')
            const insult  = await res.text();
            const user = getUserFromMention(msg.client, args[0]);

            if (user) {
                msg.channel.send(`<@${user.id}> ${insult}`);
            } else {
                await msg.reply(insult);
            }
        } catch (e) {
            console.error(e);
        } finally {
            msg.channel.stopTyping(true);
        }
    }
}