import {Injectable} from '@nestjs/common';
import {create} from "../modules/es";

export enum SessionType {
    WEBSITE = 1,
    EXTENSION = 2,
    DESKTOP = 3,
    MOBILE = 4,
}


@Injectable()
export class AppService {
    private readonly apiInstance = null;
    private config = {
        sessionType: SessionType.MOBILE,
        apiUrl: process.env.API_URL,
        assetsUrl: process.env.ASSETS_URL,
        backupApiUrl: process.env.BACKUP_API_URL,
        backupAssetsUrl: process.env.BACKUP_ASSETS_URL,
        platform: "android",
        sessionAuthHash:process.env.CLIENT_AUTH_SECRET,
        apiCallMinInterval: process.env.API_CALL_MIN_INTERVAL || '1000',
    }

    constructor() {
        this.apiInstance = create(this.config)
    }

    async loginUser({
                        userName,
                        password
                    }: { userName: string, password: string }) {
        try {
            return await this.apiInstance.serverList.get({
                type: 'mobile',
                premium: false,
                revision:'affadfqef',
                alc:null,
            })
        } catch (error) {
            return error
        }
    }
}
