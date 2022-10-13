import {
    BooleanNumber,
    SessionType
} from "../../../ws-api-client/src/api/commonTypes";
import {ApiProperty} from "@nestjs/swagger";


export class LoginBodyDto {
    username: string
    password: string
    @ApiProperty({
        enum:SessionType,
        example: 0
    })
    sessionType: number
    twoFACode?: string
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