import {ApiInterface, EndpointApi} from '../../api/commonTypes'

const endpoint = '/AdminSession'

export default (api: ApiInterface): { login: EndpointApi } => ({
    async login({
                    // @ts-ignore
                    username,
                    // @ts-ignore
                    password,
                    // @ts-ignore
                    sessionType,
                    successfulReduxAction = undefined,
                    failedReduxAction = undefined,
                    loadingReduxAction = undefined,
                } = {}) {
        const {body} = api.prepLoginForm({
            username,
            password,
            sessionType,
        })

        const opts = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        }
        const data = await api.request({
            method: 'post',
            endpoint,
            opts,
            actionCreators: {
                failedReduxAction,
                loadingReduxAction,
            },
        })
        if (successfulReduxAction) {
            api.dispatcher({
                actionCreator: successfulReduxAction,
                data: data.data as Record<string, unknown>,
            })
        }
        return data.data as Record<string, unknown>
    },
})
