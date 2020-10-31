import {Message} from "discord.js";

type BaseCommandType = {
    name: string;
    description: string;
    usage: string;
    permissions: string[];
    aliases: string[];
    guildOnly: boolean;
    coolDown: number;
    execute: (msg: Message, args: string[]) => Promise<void>;
}

abstract class BaseCommand {
    abstract name: string;
    abstract description: string;
    usage = '';
    permissions: string[]  = [];
    aliases: string[] = [];
    guildOnly = false;
    cooldown = 0;

    abstract async execute(msg: Message, args: string[]): Promise<void>;
}

export  {
    BaseCommand,
    BaseCommandType
};
