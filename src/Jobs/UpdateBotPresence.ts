import BaseJob from "./BaseJob";
import {offlinePresence, onlinePresence, startupPresence} from "../discord/utils";
import {queryStatus} from "../DataProviders";
import assert from "assert";

const {
    MINECRAFT_SERVER,
    MINECRAFT_PORT,
} = process.env;


export default class UpdateBotPresence extends BaseJob {
    interval = 10000;
    noOverlap = false;

    async bootUp(): Promise<void> {
        if (this.client && this.client.user) {
            await this.client.user.setPresence(startupPresence())
        }
    }

    async execute(): Promise<void> {
        if (this.client && this.client.user) {
            try {
                assert(MINECRAFT_SERVER);
                const port =  parseInt(MINECRAFT_PORT || '', 10) || undefined;
                const fullQueryResponse = await queryStatus(MINECRAFT_SERVER, port);
                await this.client.user.setPresence(onlinePresence(fullQueryResponse))
            } catch (e) {
                await this.client.user.setPresence(offlinePresence())
                console.error(e);
            }
        }
    }
}