import {
    ActionCreators,
    BooleanNumber,
    SessionType
} from "../../../ws-api-client/src/api/commonTypes";



export class GhostAccountCreateBodyRequest  {
    token: string
    sessionType: SessionType
}

export class CreateAccountParams {
    username: string
    password: string
    sessionType: SessionType
    params?: Record<string, unknown>
}
export class PasswordStatus {
    password_updated: BooleanNumber
}
export class ChangePasswordParams {
    password: string
    currentPassword: string
}


export class UserInfo{
    user_id: string
    secure_links_secret: string
    session_auth_hash: string
    username: string
    traffic_used: number
    traffic_max: number
    status: BooleanNumber
    email: string | null
    email_status: BooleanNumber
    billing_plan_id: number
    is_premium: BooleanNumber
    reg_date: number
    last_reset: number
    loc_rev: number
    loc_hash: string
}