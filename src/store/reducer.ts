import { RootState } from "../types";

export const initialState :RootState= { balance : 100};

 export function reducer(state:{balance:number} = initialState,action:{type:string,payload:number}){
        switch (action.type) {
            case "deposit":  return {...state, balance:state.balance + action.payload}
            case "withdraw" : return {...state, balance:state.balance - action.payload}
            default : return state
        }
}

