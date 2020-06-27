import axios from "axios"
type APIName = 'getIrregularVerbs'
const prefix = 'static/data/'
export const $get = async function <T>(name: APIName, params?: {}) {
  const response = await fetch(prefix + name + '.ts');
  return response.json() as unknown as T
}

type DynamicPath = "IrregularVerbs/irregular-verbs"
export const $getLocal = async  <T>(affixPath: DynamicPath) => ((await import('../data/' + affixPath)).data as T);
