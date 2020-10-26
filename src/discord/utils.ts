import {StatusResponse} from "minecraft-server-util/dist/model/StatusResponse";
const Discord = require('discord.js');


enum OnlineStatusIcons {
    ONLINE = '🟢',
    OFFLINE = '🔴'
}

const onlineStatusEmbed = (response: StatusResponse) => {
    const { MINECRAFT_SERVER } = process.env
    const playerNames = response.samplePlayers?.map(p => p.name) || [];

    return new Discord.MessageEmbed()
        .setColor('#43b581')
        .setTitle(`Join: ${MINECRAFT_SERVER}`)
        .setAuthor('Minecraft Server Status')
        .addField(`Server Status: ${OnlineStatusIcons.ONLINE}`, 'Online')
        .addField('Players:', `${response.onlinePlayers} / ${response.maxPlayers}`)
        .addField('Players:', playerNames.join(', ') || 'Empty AF')
        .setTimestamp()
}

const offlineStatusEmbed = () => {
    return new Discord.MessageEmbed()
        .setColor('#f04747')
        .setTitle('Minecraft Server DOWN :(')
        .setAuthor('Minecraft Server Status')
        .addField(`Server Status: ${OnlineStatusIcons.OFFLINE}`, 'Offline')
        .setTimestamp()
}

const startupPresence = () => (
    {
        activity: {
            name: 'Checking server',
            type: 'WATCHING'
        }, status: 'idle'
    }
)

const onlinePresence = (response: StatusResponse) => (
    {
        activity: {
            name: `Minecraft ${response.onlinePlayers} / ${response.maxPlayers} @ ${response.host}`,
            type: 'PLAYING',
        },
        status: 'online'
    }
)

const offlinePresence = () => (
    {
        activity: {
            name: 'Server offline',
            type: 'STREAMING',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        status: 'dnd'
    }
)

export {
    onlineStatusEmbed,
    offlineStatusEmbed,
    startupPresence,
    onlinePresence,
    offlinePresence,
};