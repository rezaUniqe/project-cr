import {SessionType} from "../../../ws-api-client/src/api/commonTypes";

enum RecordType {
    'app' = 'app', 'ext' = 'ext', 'mobile' = 'mobile'
}

export class RecordInstallDto {
    type: RecordType
    os: string
}
export class RecordInstallResDto {
    success: 1 | 0
    type: RecordType
    os: string
}