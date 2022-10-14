import {BooleanNumber, Info} from "../../../ws-api-client/src/api/commonTypes";
import {
    ServerInfo,
    ServerListType,
    ServerStatus
} from "../interfaces/server-list";
import {ApiExtraModels, ApiProperty, getSchemaPath} from "@nestjs/swagger";

export class GetServerListRequestParamsDto {
    type: ServerListType
    @ApiProperty({
        enum:[0,1]
    })
    premium: BooleanNumber
    sessionAuthHash?:string
    revision?: string = '4003'
    alc?: Array<string>
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

@ApiExtraModels(ExtensionInfo, DesktopInfo, SeverListCommonInfo, SeverListMetaInfo)
export class GetServerListResponseDto {
    @ApiProperty({
        oneOf: [{$ref: getSchemaPath(ExtensionInfo)}, {$ref: getSchemaPath(DesktopInfo)},]
    })
    data: ExtensionInfo | DesktopInfo
    info?: SeverListCommonInfo
    metadata: SeverListMetaInfo
}


