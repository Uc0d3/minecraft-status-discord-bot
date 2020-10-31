import {Client} from "discord.js";
import Timeout = NodeJS.Timeout;

export default abstract class BaseJob {
    abstract interval: number;
    noOverlap = false;
    private timer?: Timeout;

    constructor(protected client: Client) {}

    start() {
        this.stop();
        this.bootUp().finally();
        this.execute().finally();
        this.timer = setInterval(() =>
            this.execute(), this.interval
        );
    }

    public stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    setInterval(interval: number) {
        this.interval = interval;
        return this;
    }

    setNoOverlap(noOverlap: boolean) {
        this.noOverlap = noOverlap;
        return this;
    }

    async bootUp(): Promise<void> {
        return Promise.resolve()
    };

    abstract async execute(): Promise<void>;
}