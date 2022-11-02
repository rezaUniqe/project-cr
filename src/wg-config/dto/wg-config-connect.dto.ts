import { ApiExtraModels } from "@nestjs/swagger";
import {SessionType} from "../../../ws-api-client/src/api/commonTypes";

export class WgConfigConnectDto {
    app_version='3.2.915'
    sessionType:SessionType
    sessionAuthHash:string
    hostname:string
    wg_pubkey:string
}
export class WgConfigInitDto {
    app_version='3.2.915'
    sessionType:SessionType
    sessionAuthHash:string
    wg_pubkey:string
    platform:"android"
}


class Config {
    Address: string
    DNS: string
}

class Debug {
    pub_key: string
    interface: string
}


@ApiExtraModels(Config)
@ApiExtraModels(Debug)
export class WgConfigRes {
    config: Config
    debug: Debug
    success: number
}




export class WgInitConfig {
  PresharedKey: string
  AllowedIPs: string
}

export class WgInitDebug {
  init: string
}

@ApiExtraModels(WgInitConfig)
@ApiExtraModels(WgInitDebug)
export class WgInitData {

  config: WgInitConfig
  debug: WgInitDebug
  success: number
}


@ApiExtraModels(WgInitData)
export class WgConfigInitResponse {
  data: WgInitData
}
