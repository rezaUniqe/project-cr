import {create} from "../ws-api-client/src";

const config = {
    apiUrl: process.env.API_URL,
    assetsUrl: process.env.ASSETS_URL,
    backupApiUrl: process.env.BACKUP_API_URL,
    backupAssetsUrl: process.env.BACKUP_ASSETS_URL,
    platform: 'android',
    apiCallMinInterval: process.env.API_CALL_MIN_INTERVAL || '1000',
}

export const apiInstance = create(config) as any;



