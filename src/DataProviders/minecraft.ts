const minecraftUtil = require('minecraft-server-util');

import {StatusResponse} from "minecraft-server-util/dist/model/StatusResponse";


const STATUS_TIMEOUT= 4000;

const queryStatus = async (host: string, port = 25565): Promise<StatusResponse> => {
   return await minecraftUtil.status(host, {
        port,
        timeout: STATUS_TIMEOUT
    });
}

export default queryStatus;


