require('dotenv').config()

const Discord = require('discord.js');
const minecraftUtil = require('minecraft-server-util');
const fetch = require('node-fetch');

import {INSULT_COMMAND, STATUS_COMMAND} from "./consts";
import {
    getUserFromMention,
    offlinePresence,
    offlineStatusEmbed,
    onlinePresence,
    onlineStatusEmbed,
    startupPresence
} from "./discord/utils";
import assert from "assert";

const client = new Discord.Client();

const {
    DISCORD_LOGIN_TOKEN,
    MINECRAFT_SERVER
} = process.env;

assert(MINECRAFT_SERVER);

const STATUS_TIMEOUT= 4000;

const updatePresence = async () => {
    try {
        const fullQueryResponse = await minecraftUtil.status(MINECRAFT_SERVER, {
            timeout: STATUS_TIMEOUT
        });
        client.user.setPresence(onlinePresence(fullQueryResponse))
    } catch (e) {
        client.user.setPresence(offlinePresence())
        console.error(e);
    }
}

client.on('ready', () => {
    client.user.setPresence(startupPresence())
    updatePresence().finally();
    setInterval(updatePresence, 10000)
});

client.on('message', async (msg: any) => {
    if (msg.content.toLowerCase() === STATUS_COMMAND) {
        msg.reply('Checking Server Status')
            .then((newMsg: any) => {
                newMsg.delete({ timeout: 10000 })
            })

        try {
            const fullQueryResponse = await minecraftUtil.status(MINECRAFT_SERVER, {
                timeout: STATUS_TIMEOUT
            });
            const onlineStatus = onlineStatusEmbed(fullQueryResponse);
            msg.reply(onlineStatus);

        } catch (e) {
            const offlineStatus = offlineStatusEmbed()
            msg.reply(offlineStatus);
            console.error(e);
        }
    }
    if (msg.content.startsWith(INSULT_COMMAND)) {
        const withoutPrefix = msg.content.slice(1);
        const split = withoutPrefix.split(/ +/);
        const args = split.slice(1);

        try {
            const res = await fetch('https://insult.mattbas.org/api/insult')
            const insult  = await res.text();
            const user = getUserFromMention(client, args[0]);

            if (user) {
                return msg.channel.send(`<@${user.id}> ${insult}`);

            } else {
                msg.reply(insult);
            }
        } catch (e) {
            console.error(e);
        }
    }
});

client.login(DISCORD_LOGIN_TOKEN);