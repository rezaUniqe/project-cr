import {BooleanNumber} from "../../../ws-api-client/src/api/commonTypes";


export enum ServerListType {
    desktop='desktop', extension='extension', mobile='mobile', ikev2='ikev2', openvpn='openvpn'
}

export interface ServerListParams{
    type: ServerListType
    premium: BooleanNumber
    revision: string
    alc?: []
}
export enum ServerStatus {
    OFFLINE = 1,
    ONLINE = 2,
}

export interface ServerInfo {
    id: number
    name: string // Country name
    country_code: string // ISO 3166-1 alpha-2 country code
    status: ServerStatus // 1 - Location is online. 2 - Location is temporarily offline.
    premium_only: BooleanNumber // free or premium
    short_name: string // same as country code except for US and Canada locations, which are subdivided by coast.
    p2p: BooleanNumber // p2p allowed or not
    tz_offset: string
}



 interface DesktopInfo extends ServerInfo {
    nodes: Node[]
}

export interface Node {
    ip: string // nodes.hostname ip
    ip2: string // for OpenVPN conections
    ip3: string // for Stunnect connections
    hostname: string // for IKEv2
    weight: number // relatve node weight
    group: string //data center in which the server is
}
 interface ExtensionInfo extends ServerInfo {
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

export type ServerListData = Array<DesktopInfo> | Array<ExtensionInfo>