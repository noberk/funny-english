import { RouteComponentProps } from "react-router";
import AddVocabulary from "../pages/AddVocabulary/addVocabulary";
export const $img: string = './resource/images/';
type RouteType = { name: string, childen?: RouteType[], to: string }
export type RouteSimpleType = { address: string, key: number; name: string, path: string, component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> }[]
// export function getRouteLinkAddress() {
//    return [
//         { key: 1, address: `index`, name: `首页`, path: `/`, component: Home },
//         { key: 2, address: `login`, name: `登陆`, path: `/login`, component: Login },
//         { key: 3, address: `register`, name: `注册`, path: `/register`, component: Register },
//         { key: 4, address: `article`, name: `文章`, path: `/article`, component: Article },
//         { key: 5, address: `vocabulary`, name: `词汇`, path: `/vocabulary`, component: Vocabulary },
//     ]
// }
export const Nav ={
    addVocabulary : {
        path: "./addVocabulary" , page: AddVocabulary
    }
}
