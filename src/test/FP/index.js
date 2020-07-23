type Goods={name:string,price:number}
type User={
    name:string,
    cart:Goods[]
    purchases:Goods[]
    active:boolean
}
type ProcessUserFunc= (...args:any[])=> User
const user :User={
    name:'lee',
    cart:[],
    purchases:[],
    active:true,
}

const compose = (f:ProcessUserFunc,s:ProcessUserFunc) => (...args) => f(s(...args))
function pruchaseItem(...arg:Function[]){   
   return arg.reduce(compose)
}

function tax(user:User){
    const taxRate= 1.03
    const {cart} = user
     const updatedCart= cart.map(item=> ({...item,price:item.price*taxRate }))
     return Object.assign({},user,{cart:updatedCart})
    
}
function itemToCart(user:User,item:Goods){
    console.log(user);
    console.log(item);
    
     const updateCart= user.cart.concat(item)
     console.log(updateCart);
     
    return Object.assign({},user,{cart:updateCart})
}

function buyItem(user:User){
    return Object.assign({},user,{purchases: user.cart})
}
function emptyCart(user:User){
    return Object.assign({},user,{cart:[]})
}

const result= pruchaseItem(
    emptyCart,
    buyItem,
    tax,
    itemToCart,
)(user,{name:'laptop',price:500})

console.log(result);

 

 