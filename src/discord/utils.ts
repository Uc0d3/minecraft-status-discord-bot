import {Client, Message, PresenceData} from "discord.js";
import {StatusResponse} from "minecraft-server-util/dist/model/StatusResponse";
import {wait} from "../utils/wait";
const Discord = require('discord.js');


enum OnlineStatusIcons {
    ONLINE = '🟢',
    OFFLINE = '🔴'
}

const onlineStatusEmbed = (response: StatusResponse) => {
    const playerNames = response.samplePlayers?.map(p => p.name) || [];

    const message = new Discord.MessageEmbed()
        .setColor('#43b581')
        .setTitle(`Join: ${response.host}`)
        .setAuthor('Minecraft Server Status')
        .addField(`Server Status`, `Online ${OnlineStatusIcons.ONLINE}`, true)
        .addField('Players:', `${response.onlinePlayers} / ${response.maxPlayers}`, true)
        .addField('Port', response.port, true)
        .addField('Version', response.version, true);

    if (playerNames?.length) {
        message.addField('Players:', playerNames.join(', '));
    }

    message.setTimestamp();

    return message;
}

const offlineStatusEmbed = (host: string, port: number) => {
    return new Discord.MessageEmbed()
        .setColor('#f04747')
        .setTitle('Minecraft Server DOWN :(')
        .setAuthor('Minecraft Server Status')
        .addField('Server Status', `Offline ${OnlineStatusIcons.OFFLINE}`, true)
        .addField(`Host`, host, true)
        .addField(`Port`, port, true)
        .setTimestamp()
}

const startupPresence = (): PresenceData => (
    {
        activity: {
            name: 'Checking server',
            type: 'WATCHING'
        },
        status: 'idle'
    }
)

const onlinePresence = (response: StatusResponse): PresenceData => (
    {
        activity: {
            name: `Minecraft ${response.onlinePlayers} / ${response.maxPlayers} @ ${response.host}`,
            type: 'PLAYING',
        },
        status: 'online'
    }
)

const offlinePresence = (): PresenceData => (
    {
        activity: {
            name: 'Server offline',
            type: 'STREAMING',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        status: 'dnd'
    }
)

function getUserFromMention(client: Client, mention: string) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

const sendDelayed = async ( callback: () => Promise<Message>, msg: Message, delay: number = 0): Promise<Message> => {
    await msg.channel.stopTyping();
    msg.channel.startTyping();
    await wait(delay);
    const newMsg = await callback();
    await msg.channel.stopTyping(true);
    return newMsg;
}

export {
    onlineStatusEmbed,
    offlineStatusEmbed,
    startupPresence,
    onlinePresence,
    offlinePresence,
    getUserFromMention,
    sendDelayed
};