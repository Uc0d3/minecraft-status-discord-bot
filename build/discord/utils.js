"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlinePresence = exports.onlinePresence = exports.startupPresence = exports.offlineStatusEmbed = exports.onlineStatusEmbed = void 0;
var Discord = require('discord.js');
var OnlineStatusIcons;
(function (OnlineStatusIcons) {
    OnlineStatusIcons["ONLINE"] = "\uD83D\uDFE2";
    OnlineStatusIcons["OFFLINE"] = "\uD83D\uDD34";
})(OnlineStatusIcons || (OnlineStatusIcons = {}));
var onlineStatusEmbed = function (response) {
    var _a;
    var MINECRAFT_SERVER = process.env.MINECRAFT_SERVER;
    var playerNames = ((_a = response.samplePlayers) === null || _a === void 0 ? void 0 : _a.map(function (p) { return p.name; })) || [];
    return new Discord.MessageEmbed()
        .setColor('#43b581')
        .setTitle("Join: " + MINECRAFT_SERVER)
        .setAuthor('Minecraft Server Status')
        .addField("Server Status: " + OnlineStatusIcons.ONLINE, 'Online')
        .addField('Players:', response.onlinePlayers + " / " + response.maxPlayers)
        .addField('Players:', playerNames.join(', '))
        .setTimestamp();
};
exports.onlineStatusEmbed = onlineStatusEmbed;
var offlineStatusEmbed = function () {
    return new Discord.MessageEmbed()
        .setColor('#f04747')
        .setTitle('Minecraft Server DOWN :(')
        .setAuthor('Minecraft Server Status')
        .addField("Server Status: " + OnlineStatusIcons.OFFLINE, 'Offline')
        .setTimestamp();
};
exports.offlineStatusEmbed = offlineStatusEmbed;
var startupPresence = function () { return ({
    activity: {
        name: 'Checking server',
        type: 'WATCHING'
    }, status: 'idle'
}); };
exports.startupPresence = startupPresence;
var onlinePresence = function (response) { return ({
    activity: {
        name: response.onlinePlayers + " / " + response.maxPlayers,
        type: 'PLAYING',
    },
    status: 'online'
}); };
exports.onlinePresence = onlinePresence;
var offlinePresence = function () { return ({
    activity: {
        name: 'Server offline',
        type: 'WATCHING'
    },
    status: 'dnd'
}); };
exports.offlinePresence = offlinePresence;
