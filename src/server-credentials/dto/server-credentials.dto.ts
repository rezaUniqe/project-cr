import {ServerListType} from "../../server-list/interfaces/server-list";


export class SessionHash{
    sessionAuthHash:string
}

export class ServerCredentialsParams{
    sessionAuthHash:string
    type:ServerListType
}

export class Credential {
    username: string
    password: string
}