import {ApiException, RequestArgs} from './commonTypes'
import {getConfig, setConfig} from './config'
import {AxiosResponse} from "axios";
import https from 'https';

const axios = require('axios');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

axios.defaults.httpsAgent = httpsAgent


interface PrepareValidUrlArgs {
    url: string
    assets?: boolean
    useBackup?: boolean
}

const prepareValidUrl = ({
                             url,
                             assets = false,
                             useBackup = false,
                         }: PrepareValidUrlArgs) => {
    const {assetsUrl, apiUrl, backupApiUrl, backupAssetsUrl} = getConfig()


    const urlValidator = new RegExp(/^http|ftp|file:\/\//gim)
    // If it's a full url send use it as is
    if (urlValidator.test(url)) {
        return url
    }
    let baseUrl

    if (useBackup) {
        baseUrl = assets ? backupAssetsUrl : backupApiUrl
    } else {
        baseUrl = assets ? assetsUrl : apiUrl
    }

    // If it's a base endpoint without a / starting add it
    if (!urlValidator.test(url) && !url.startsWith('/')) {
        return `${baseUrl}/${url}`
        // If the endpoint has the slash return it with the base url
    } else if (!urlValidator.test(url) && url.startsWith('/')) {
        return baseUrl + url
    }
}


const sendRequest = async ({
                               endpoint,
                               debugOpts = {},
                               opts = {},
                               method = 'get',
                               assets = false,
                           }: RequestArgs): Promise<AxiosResponse> => {


    const RATE_LIMIT_ERROR_CODE = 7331
    /* Sets the url, if there's params it'll construct and append the params to the url */
    const defaultParams = {...opts.params, platform: getConfig().platform}
    /*
        Sets up the config.
        if there's a key named method just pass the options object.
        if not, use the method argument.
      */
    const config = opts.method ? opts : {...opts, method}

    const send = async (useBackup = false) => {
        const {lastCallTimeStamps = {}, apiCallMinInterval} = getConfig()
        const params =
            useBackup && endpoint.includes('ExtBlocklists')
                ? {...defaultParams, domain: 'totallyacdn.com'}
                : defaultParams

        const apiUrl = prepareValidUrl({url: endpoint, assets, useBackup})

        const debugUrl = apiUrl
        // @ts-ignore
        global.url = debugUrl
        const timeToNextCall =
            Number(apiCallMinInterval) -
            (Date.now() - lastCallTimeStamps[endpoint] ?? 0)
        if (timeToNextCall > 0 && !useBackup) {
            throw {
                code: RATE_LIMIT_ERROR_CODE,
                message: `Last call to ${endpoint} less than ${apiCallMinInterval}ms ago. Call aborted. Retry in ${timeToNextCall}ms`,
                debug: {
                    debugUrl,
                    debugOpts,
                    lastCallTimeStamps,
                    timeToNextCall
                },
                data: {debugUrl, debugOpts, lastCallTimeStamps, timeToNextCall},
            } as ApiException
        }
        try {
            setConfig({
                lastCallTimeStamps: {
                    ...lastCallTimeStamps,
                    [endpoint]: Date.now()
                },
            })
            const controller = new AbortController()
            setTimeout(() => controller.abort(), 3000)


            const response = await axios.request({
                url: apiUrl,
                data:config.body,
                params: {...params},
                headers: config.headers as any,
                method: config.method,
                proxy: {
                    host: '127.0.0.1',
                    protocol: 'https',
                    port: 8080
                }
            })

            if (response.status === 404) {
                throw {
                    code: response.status,
                    message: response.statusText,
                    debug: {
                        debugUrl,
                        debugOpts,
                    },
                    data: {debugUrl, debugOpts},
                } as ApiException
            }
            return response
        } catch (e) {
            throw {
                code: 0,
                message: `Error fetching url. ${(e as any)?.message ?? ''}`,
                debug: {debugUrl, debugOpts},
                data: {debugUrl, debugOpts},
            } as ApiException
        }
    }

    /* Make the request */
    try {
        return await send()
    } catch (e) {
        console.error((e as any)?.message)
        let resp
        if ((e as any)?.code === RATE_LIMIT_ERROR_CODE) {
            await new Promise(resolve => setTimeout(resolve, (e as any)?.data.timeToNextCall))
            resp = await send()
        } else {
            // TODO: Figure out when to retry
            resp = await send(true)
        }
        return resp
    }
}

export default sendRequest
