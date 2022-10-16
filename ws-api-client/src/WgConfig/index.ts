import {
    ActionCreators,
    ApiArgs,
    ApiInterface,
    EndpointApi,
} from '../api/commonTypes'


 interface WireGuardRes {
    config: Config
    debug: Debug
    success: number
}

 interface Config {
    Address: string
    DNS: string
}

 interface Debug {
    pub_key: string
    interface: string
}


export default (
    api: ApiInterface<WireGuardRes>,
): { post: EndpointApi<ActionCreators & ApiArgs, WireGuardRes> } => ({
    /**
     * POST /RecordInstall
     * @param {String} type Type of install: [app, ext, mobile]
     * @param {String} os Operating system or Browser
     * @param {Function} successfulReduxAction Optional, A redux action creator on successful request
     * @param {Function} failedReduxAction Optional, A redux action creator on failed request
     * @param {Function} loadingReduxAction Optional, A redux action creator on request start
     */
    async post({
                   successfulReduxAction = undefined,
                   failedReduxAction = undefined,
                   loadingReduxAction = undefined,
                   params
               }) {
        const data = await api.post({
            endpoint: '/WgConfigs/connect',
            params: params,
            actionCreators: {
                failedReduxAction,
                loadingReduxAction,
            },
        })
        if (successfulReduxAction) {
            api.dispatcher({
                actionCreator: successfulReduxAction,
                data: data.data,
                getConfig: api.getConfig,
            })
        }
        return data.data
    },
})
