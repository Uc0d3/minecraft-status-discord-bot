require('dotenv').config()

const Discord = require('discord.js');
const minecraftUtil = require('minecraft-server-util');

import {STATUS_COMMAND} from "./consts";
import {
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
    } catch {
        client.user.setPresence(offlinePresence())
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

        } catch {
            const offlineStatus = offlineStatusEmbed()
            msg.reply(offlineStatus);
        }
    }
});

client.login(DISCORD_LOGIN_TOKEN);