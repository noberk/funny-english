export type ActionType = {type:"increase"|"decrease"|"update" ,name?: string}

class createStore {
  listeners :any[]= [];
  constructor(public reducer:any,public state:any){  }
  subscribe(func:any){
    this.listeners.push(func)
  }
  dispatch(action:ActionType){
   
    this.state = this.reducer(this.state,action);
    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i];
      listener();
    }
  }
  getState(){
    return this.state;
  }

}


let initState = {
  counter: {
    count: 0,
    name: "Andrew Li"
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
}

function counterReducer(state:any,action:ActionType){


   switch (action.type) {
     case "increase":
       return {
         ...state,
         count:  ++state.count 
       }
       case "decrease":
        return {
          ...state,
          count:  --state.count
        }
        default: return {
          ...state
        }
   }
}
function InfoReducer (state:any, action : ActionType){
  switch (action.type) {
    case "update":
      return {
        ...state,
        name : "front-end" , description : "we love front-end development"
      }
    default: return {
      ...state
    } 
  }
}
 
function combineReducers(reducers:any) {

  /* reducerKeys = ['counter', 'info']*/
  const reducerKeys = Object.keys(reducers)

  /*返回合并后的新的reducer函数*/
  return function combination(state :any= {}, action:any) {
    /*生成的新的state*/
    const nextState:any = {}

    /*遍历执行所有的reducers，整合成为一个新的state*/
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i]
      let currentReducer = reducers[key];
      
      /*之前的 key 的 state*/
      let previousStateForKey = state[key]
      /*执行 分 reducer，获得新的state*/
      let nextStateForKey = currentReducer(previousStateForKey, action)

      nextState[key] = nextStateForKey
    }
    return nextState;
  }
}

const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});
 

let store =new createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});
/*自增*/
store.dispatch({
  type: 'increase'
});

/*修改 name*/
store.dispatch({
  type: 'update'
});