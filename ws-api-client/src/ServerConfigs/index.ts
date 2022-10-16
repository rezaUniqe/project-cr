import {
    ActionCreators,
    ApiArgs,
    ApiInterface,
    EndpointApi
} from '../api/commonTypes'

const endpoint = '/ServerConfigs'

interface ServerConfig {
    config: string
}


export default (
    api: ApiInterface<ServerConfig>,
): { get: EndpointApi<ActionCreators & ApiArgs , any> } => ({
    /**
     * GET ServerCredentials
     * @param {Function} successfulReduxAction Optional, A redux action creator on successful request
     * @param {Function} failedReduxAction Optional, A redux action creator on failed request
     * @param {Function} loadingReduxAction Optional, A redux action creator on request start
     */
    async get({params,headers,loadingReduxAction,successfulReduxAction,failedReduxAction}) {

        const data = await api.get({
            endpoint,
            headers:headers,
            params: params,
            actionCreators: {failedReduxAction, loadingReduxAction},
        })
        const response = {
            config: data
        }
        if (successfulReduxAction) {
            api.dispatcher({
                actionCreator: successfulReduxAction,
                data: response,
                ...api,
            })
        }
        return response
    },
})
