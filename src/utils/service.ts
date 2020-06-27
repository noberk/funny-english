type APIName = 'IrregularVerbsList'

const myHeaders = new Headers()

export const $get = function <T>(name: APIName, params?: {}) {
  const rqst = new Request(`/public/'${name}'json`, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  })
  return (fetch(rqst).then(response => response.json()) as unknown) as T
}
