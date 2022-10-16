import {
    ActionCreators,
    ApiArgs,
    ApiInterface,
    EndpointApi
} from '../api/commonTypes'

const endpoint = '/PortMap'

 interface Portmap {
    protocol: string
    heading: string
    use: string
    ports: string[]
    legacy_ports?: string[]
}


 interface PortMapData {
    portmap: Portmap[]
}




export default (
    api: ApiInterface<PortMapData>,
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

        console.log(data)
        if (successfulReduxAction) {
            api.dispatcher({
                actionCreator: successfulReduxAction,
                data: data.data,
                ...api,
            })
        }
        return data.data
    },
})
