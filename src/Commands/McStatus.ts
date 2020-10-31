import { BaseCommand } from "./BaseCommand";
import {offlineStatusEmbed, onlineStatusEmbed} from "../discord/utils";
import {Message} from "discord.js";
import { queryStatus } from "../DataProviders";

const {
    MINECRAFT_SERVER
} = process.env;


export default class McStatus extends BaseCommand {
    name = 'status';
    description = 'Check status of a minecraft server';

    async execute(msg: Message, args: string[]): Promise<void> {
        const newMessage = await msg.reply('Checking Server Status');

        const [hostArg, portArg] = args;
        const host = hostArg || MINECRAFT_SERVER || '';
        const port =  parseInt(portArg, 10) || 25565;

        try {
            const fullQueryResponse = await queryStatus(host, port);
            const onlineStatus = onlineStatusEmbed(fullQueryResponse);
            await msg.reply(onlineStatus);
        } catch (e) {
            const offlineStatus = offlineStatusEmbed(host, port)
            await msg.reply(offlineStatus);
            console.error(e);
        } finally {
            await newMessage.delete();
            await msg.channel.stopTyping();
        }
    }
}