import {SessionType} from "../../../ws-api-client/src/api/commonTypes";

export class WgConfigDto {
    app_version='3.2.915'
    sessionType:SessionType
    sessionAuthHash:string
    hostname:string
    wg_pubkey:string
}


interface Config {
    Address: string
    DNS: string
}

interface Debug {
    pub_key: string
    interface: string
}

export class WgConfigRes {
    config: Config
    debug: Debug
    success: number
}