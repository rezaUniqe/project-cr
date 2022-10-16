import {
    BooleanNumber,
    SessionType
} from "../../../ws-api-client/src/api/commonTypes";


export class LoginBodyDto {
    username: string
    password: string
    sessionType: SessionType
    twoFACode?: string
}
export class CurrentSessionParams{
    sessionAuthHash:string
}
export class SessionData {
    session_auth_hash: string
    username: string
    user_id: string
    traffic_used: number
    traffic_max: number
    status: BooleanNumber
    email?: string
    email_status: BooleanNumber
    billing_plan_id: number
    is_premium: BooleanNumber
    reg_date: number
    loc_rev: number
    loc_hash: string
}