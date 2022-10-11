import {Injectable} from '@nestjs/common';
import {SessionType} from "../ws-api-client/src/api/commonTypes";
import wsApiClient from 'ws-api-client'

const config = {
    sessionType: SessionType.WEBSITE,
}
const apiInstance = wsApiClient(config)

@Injectable()
export class AppService {


    async loginUser({
                        userName,
                        password
                    }: { userName: string, password: string }) {
        try {
            return await apiInstance.session.login(userName, password)
        } catch (error) {
            console.log(error?.toString())

        }
    }
}
