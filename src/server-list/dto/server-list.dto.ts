import {BooleanNumber, Info} from "../../../ws-api-client/src/api/commonTypes";
import {
    Group,
    MobileRes, MyNode,
    ServerInfo,
    ServerListType,
    ServerStatus
} from "../interfaces/server-list";
import {ApiExtraModels, ApiProperty, getSchemaPath} from "@nestjs/swagger";

export class GetServerListRequestParamsDto {
    type: ServerListType
    premium: BooleanNumber
    sessionAuthHash?: string
    revision?: string = '4003'
    alc?: Array<string>
}

class ServerListNode implements MyNode{
    group: string;
    hostname: string;
    ip: string;
    ip2: string;
    ip3: string;
    weight: number;

}

@ApiExtraModels(ServerListNode)
class ServerListGroupContent implements Group {
    city: string;
    gps: string;
    health: number;
    id: number;
    link_speed: string;
    nick: string;
    nodes: Array<ServerListNode>;
    ovpn_x509: string;
    ping_ip: string;
    pro: number;
    tz: string;
    wg_endpoint: string;
    wg_pubkey: string;
}


class ExtensionInfo implements ServerInfo {
    country_code: string;
    id: number;
    name: string;
    p2p: BooleanNumber;
    premium_only: BooleanNumber;
    short_name: string;
    status: ServerStatus;
    tz_offset: string;
    groups: {
        // key is Data-center/City name
        [key: string]: {
            pro: BooleanNumber // free or premium
            hosts: [
                {
                    hostname: string // hostname used in PAC file
                    weight: number // relative weight for load balancing
                },
            ]
        }
    }
}

@ApiExtraModels(ServerListGroupContent)
class MobileInfo implements MobileRes {
    country_code: string;
    dns_hostname: string;
    force_expand: number;
    groups: Array<ServerListGroupContent>;
    id: number;
    loc_type: string;
    name: string;
    p2p: number;
    premium_only: number;
    short_name: string;
    status: number;
    tz: string;
    tz_offset: string;
}

class DesktopInfo implements ServerInfo {
    country_code: string;
    id: number;
    name: string;
    p2p: BooleanNumber;
    premium_only: BooleanNumber;
    short_name: string;
    status: ServerStatus;
    tz_offset: string;
    nodes: Node[]


}

class SeverListCommonInfo implements Info {
    changed: BooleanNumber;
    revision_hash: string;
    revison: string;
}

class SeverListMetaInfo {
    serviceRequestId?: string
    hostName?: string
    duration?: string
    logStatus?: string
    md5?: string

}

@ApiExtraModels(ExtensionInfo, DesktopInfo, MobileInfo, SeverListCommonInfo, SeverListMetaInfo)
export class GetServerListResponseDto {
    @ApiProperty({
        oneOf: [{$ref: getSchemaPath(ExtensionInfo)}, {$ref: getSchemaPath(DesktopInfo)}, {$ref: getSchemaPath(MobileInfo)}]
    })
    data: ExtensionInfo | DesktopInfo | MobileInfo
    info?: SeverListCommonInfo
    metadata: SeverListMetaInfo
}


