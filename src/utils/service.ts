import axios from "axios"
type APIName = 'getIrregularVerbs'
const prefix = 'static/data/'
const myHeaders = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
})

export const $get = function <T>(name: APIName, params?: {}) {
  axios({
    method: 'get',
    url: prefix + "getIrregularVerbs.ts"
  }).then((resp) => {
    console.log(resp);
  }, (err) => {
    console.log(err);
  });
  fetch(prefix + "getIrregularVerbs.ts").then(response => response.json()).then(data => console.log(data));
  // fetch('http://andoso.cn/static/data/getIrregularVerbs.json').then(response => response.json()).then(data => console.log(data));
}
