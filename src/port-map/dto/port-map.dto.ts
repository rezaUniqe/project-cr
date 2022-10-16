import {SessionType} from "../../../ws-api-client/src/api/commonTypes";
import {ApiExtraModels} from "@nestjs/swagger";

export class PortMapDto {
    version=5
    app_version="3.2.915"
    sessionType:SessionType
    sessionAuthHash: string
}


class Portmap {
    protocol: string
    heading: string
    use: string
    ports: string[]
    legacy_ports?: string[]
}

@ApiExtraModels(Portmap)
export class PortMapDataResponse {
    portmap: Portmap[]
}
