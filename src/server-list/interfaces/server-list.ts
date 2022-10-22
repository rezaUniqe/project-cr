import {BooleanNumber} from "../../../ws-api-client/src/api/commonTypes";
export enum ServerListType {
    mobile='mob-v2'
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
export interface MobileRes {
    country_code: string
    dns_hostname: string
    force_expand: number
    groups: Group[]
    id: number
    loc_type: string
    name: string
    p2p: number
    premium_only: number
    short_name: string
    status: number
    tz: string
    tz_offset: string
}

export interface MyNode {
    ip: string // nodes.hostname ip
    ip2: string // for OpenVPN conections
    ip3: string // for Stunnect connections
    hostname: string // for IKEv2
    weight: number // relatve node weight
    group: string //data center in which the server is
}



export interface Group {
    city: string
    gps: string
    health: number
    id: number
    link_speed: string
    nick: string
    nodes: Array<MyNode>
    ovpn_x509: string
    ping_ip: string
    pro: number
    tz: string
    wg_endpoint: string
    wg_pubkey: string
}

