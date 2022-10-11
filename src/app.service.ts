import {Injectable} from '@nestjs/common';
import {BooleanNumber, SessionType} from "../ws-api-client/src/api/commonTypes";
import {create} from "../ws-api-client/src/";


@Injectable()
export class AppService {
    config = {
        apiUrl: process.env.API_URL,
        assetsUrl: process.env.ASSETS_URL,
        backupApiUrl: process.env.BACKUP_API_URL,
        backupAssetsUrl: process.env.BACKUP_ASSETS_URL,
        sessionAuthHash: process.env.CLIENT_AUTH_SECRET,
        apiCallMinInterval: process.env.API_CALL_MIN_INTERVAL || '1000',
        sessionType: SessionType.MOBILE,
    }

    apiInstance = null

    constructor() {
        this.apiInstance = create(this.config)
    }

    async loginUser({
                        userName,
                        password
                    }: { userName: string, password: string }) {
        try {
            return await this.apiInstance.session.login({
                username: userName,
                password: password,
                sessionType: SessionType.MOBILE
            })
        } catch (error) {
            console.log(error?.toString())
            return error
        }
    }

    async serverList() {
        try {
            console.log('ssss')
            console.log(await this.apiInstance.serverList.get({type:'mobile',premium:BooleanNumber.FALSE,revision:'affaasfs'}))
        } catch (error) {
            console.log('sgsagsg')
            console.log(error?.toString())
            return error
        }
    }


}
