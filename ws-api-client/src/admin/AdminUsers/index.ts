import urlJoin from 'url-join'
import {ApiInterface, EndpointApi} from '../../api/commonTypes'

const endpoint = '/AdminUsers'

export default (
    api: ApiInterface,
): { get: EndpointApi; getMany: EndpointApi; put: EndpointApi } => ({
    /**
     * getUser retreives a single user by ID
     * @param {Number|String} userId Users numeric ID or (String) displayId
     * @param {Function} successfulReduxAction Optional, A redux action creator on successful request
     * @param {Function} failedReduxAction Optional, A redux action creator on failed request
     * @param {Function} loadingReduxAction Optional, A redux action creator on request start
     */
    async get({
                  // @ts-ignore

                  userId,
                  successfulReduxAction = undefined,
                  failedReduxAction = undefined,
                  loadingReduxAction = undefined,
              } = {}) {
        const data = await api.request({
            method: 'post',
            endpoint: urlJoin(endpoint, userId),
            actionCreators: {failedReduxAction, loadingReduxAction},
        })
        if (successfulReduxAction) {
            api.dispatcher({
                actionCreator: successfulReduxAction,
                data: data.data as Record<string, unknown>,
            })
        }
        return data.data
    },
    /**
     * getMany retreives all users or filtered by params, paginated to 50 results
     * @param {Number} page Optional, page number to return
     * @param {String} search Optional, a username or email to filter by
     * @param {Number} premium Optional, return only premium or free users [0 or 1]
     * @param {Number} affid Optional, search for users referred by affid
     * @param {Function} successfulReduxAction Optional, A redux action creator on successful request
     * @param {Function} failedReduxAction Optional, A redux action creator on failed request
     * @param {Function} loadingReduxAction Optional, A redux action creator on request start
     */
    async getMany({
                      // @ts-ignore

                      page = null,
                      // @ts-ignore

                      search = null,
                      // @ts-ignore

                      premium = null,
                      // @ts-ignore

                      affid = null,
                      successfulReduxAction = undefined,
                      failedReduxAction = undefined,
                      loadingReduxAction = undefined,
                  } = {}) {
        const params = {
            page_number: page,
            identifier: search,
            premium,
            affid,
        }
        const data = await api.get({
            endpoint,
            params,
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
        return data.data
    },
    async put({
                  // @ts-ignore
                  userId = null,
                  // @ts-ignore

                  billingPlan = null,
                  // @ts-ignore
                  status = null,
                  successfulReduxAction = undefined,
                  failedReduxAction = undefined,
                  loadingReduxAction = undefined,
              } = {}) {
        if (!userId) {
            throw Error('userId is not defined')
        }

        const params = {
            billing_plan: billingPlan,
            status,
        }

        const {data} = await api.put({
            params,
            endpoint: `${endpoint}/${userId}`,
            actionCreators: {
                failedReduxAction,
                loadingReduxAction,
            },
        })
        if (successfulReduxAction) {
            api.dispatcher({
                actionCreator: successfulReduxAction,
                data: data as Record<string, unknown>,
            })
        }
        return data
    },
})
