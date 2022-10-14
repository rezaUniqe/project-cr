import { ApiInterface, EndpointApi, ActionCreators } from '../api/commonTypes'

const endpoint = '/ServerCredentials'

interface Credential {
  username: string
  password: string
}
export default (
  api: ApiInterface<Credential>,
): { get: EndpointApi<ActionCreators, Credential> } => ({
  /**
   * GET ServerCredentials
   * @param {Function} successfulReduxAction Optional, A redux action creator on successful request
   * @param {Function} failedReduxAction Optional, A redux action creator on failed request
   * @param {Function} loadingReduxAction Optional, A redux action creator on request start
   */
  async get({
    successfulReduxAction = undefined,
    failedReduxAction = undefined,
    loadingReduxAction = undefined,
  } = {}) {
    const data = await api.get({
      endpoint,
      params: {},
      actionCreators: { failedReduxAction, loadingReduxAction },
    })
    const response = {
      username: Buffer.from(data.data.username, 'base64').toString(),
      password: Buffer.from(data.data.password, 'base64').toString(),
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
