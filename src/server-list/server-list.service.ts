import {Injectable} from '@nestjs/common';
import {create} from 'ws-api-client/src';
import {
    SessionType
} from "../../ws-api-client/src/api/commonTypes";
import {
    GetServerListRequestParamsDto,
    GetServerListResponseDto
} from "./dto/server-list.dto";
import {setConfig} from "../../ws-api-client/src/api";


@Injectable()
export class ServerListService {
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

    async getServerList({sessionAuthHash,...args}: GetServerListRequestParamsDto): Promise<GetServerListResponseDto> {
        try {
            setConfig({
                sessionAuthHash:sessionAuthHash
            })
            return await this.apiInstance.serverList.get(args)
        } catch (error) {
            throw error
        }
    }


}
