import {SessionType} from "../../../ws-api-client/src/api/commonTypes";


export class ServerConfigsDto {
    app_version = '3.2.915'
    platform = 'android'
    cipher = 'gcm'
    sessionType: SessionType
    sessionAuthHash: string
}

export class ServerConfig {
    config: string
}