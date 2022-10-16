import qs from 'query-string'
import {ActionCreator, ApiCall, ApiException, ApiRequest} from './commonTypes'
import getMandatoryParams from './getMandatoryParams'
import {getConfig} from './config'
import dispatcher from './dispatcher'
import sendRequest from './sendRequest'
import {AxiosResponse} from "axios";

const createSessionErrorAndDispatchAction = (actionCreator: ActionCreator) => {
    const err = {
        code: 1337,
        message: 'No session auth hash in API',
    } as ApiException
    if (actionCreator()) {
        dispatcher({actionCreator, data: err})
    }
    return err
}

//#region Parse response
interface ParseResponseArgs {
    response: AxiosResponse
    debug?: Record<string, unknown>
}

const parseResponse = async ({response, debug}: ParseResponseArgs) => {
    if (response.status >= 500) {
        throw {
            code: response.status,
            message: response.statusText,
            debug,
            data: debug,
        } as ApiException
    }
    else {
       return await response.data
    }
}
//#endregion

const request: ApiRequest = async ({
                                       method,
                                       endpoint,
                                       opts = {},
                                       debugOpts = {},
                                       actionCreators: {
                                           successfulReduxAction,
                                           failedReduxAction,
                                           loadingReduxAction,
                                       },
                                       assets = false,
                                   }) => {
    try {
        if (loadingReduxAction) {
            // @ts-ignore
            dispatcher({getConfig, actionCreator: loadingReduxAction})
        }
        const response = await sendRequest({
            endpoint,
            debugOpts,
            opts,
            method,
            assets,
            actionCreators: {},
        })
        /* check for errors in the response body */
        const data = await parseResponse({
            response,
            debug: {
                response,
                debugOpts,
                endpoint,
                // @ts-ignore
                url: global.url,
            },
        })

        if (successfulReduxAction) {
            dispatcher({actionCreator: successfulReduxAction, data})
        }
        return data
    } catch (e) {
        // make sure code is always available for consistency
        (e as any).code = (e as any).code || 0
        if (failedReduxAction) {
            dispatcher({actionCreator: failedReduxAction, data: e})
        } else {
            throw e
        }
    }
}

//#region Http verb calls

const get: ApiCall = async ({
                                endpoint,
                                headers,
                                params,
                                actionCreators = {}
                            }) => {
    const {sessionAuthHash} = getConfig()
    if (!sessionAuthHash) {
        // @ts-ignore
        throw createSessionErrorAndDispatchAction(actionCreators.failedReduxAction)
    }
    const data = await request({
        method: 'get',
        endpoint,
        opts: {
            headers: headers,
            params: {...params, ...getMandatoryParams(sessionAuthHash)}
        },
        actionCreators,
    })
    return data
}
const post: ApiCall = async ({
                                 endpoint,
                                 params: requestParams,
                                 actionCreators = {},
                             }) => {
    const {sessionAuthHash} = getConfig()

    const params = {
        ...requestParams,
        ...getMandatoryParams(sessionAuthHash),
    }

    const body = qs.stringify(params)

    const opts = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'user-agent': 'okhttp/4.9.3',
        },
        body,
    }
    const data = await request({
        method: 'post',
        endpoint,
        opts,
        debugOpts: {...opts},
        actionCreators,
    })
    return data
}
const put: ApiCall = async ({
                                endpoint,
                                params: requestParams,
                                actionCreators = {},
                            }) => {
    const {sessionAuthHash} = getConfig()
    if (!sessionAuthHash) {
        // @ts-ignore
        throw createSessionErrorAndDispatchAction(actionCreators.failedReduxAction)
    }
    const params = {
        ...requestParams,
        ...getMandatoryParams(sessionAuthHash),
    }

    const body = qs.stringify(params)

    const opts = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    }

    const data = await request({
        method: 'put',
        endpoint,
        opts,
        actionCreators,
    })
    return data
}
const del: ApiCall = async ({endpoint, params, actionCreators = {}}) => {
    const {sessionAuthHash} = getConfig()
    if (!sessionAuthHash) {
        // @ts-ignore
        throw createSessionErrorAndDispatchAction(actionCreators.failedReduxAction)
    }
    const data = await request({
        method: 'delete',
        endpoint,
        opts: {
            params: {
                ...params,
                ...getMandatoryParams(sessionAuthHash),
            },
        },
        actionCreators,
    })
    return data
}
//#endregion

export {get, put, post, del, request}
